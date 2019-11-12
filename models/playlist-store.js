'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');

const playlistStore = {
  
  store: new JsonStore('./models/playlist-store.json', { playlistCollection: [] }),
  collection: 'playlistCollection',
  
  getAllPlaylists(){
    logger.debug("loading all list");
    logger.debug(this.store.findAll(this.collection))
    return this.store.findAll(this.collection);
  },
  
  getUserPlaylists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  getPlaylist(id){
    return this.store.findOneBy(this.collection, {id: id});
  },
  
  addPlaylist(playlist){
    this.store.add(this.collection, playlist);
    this.store.save();
  },
  
  removePlaylist(id){
    const playlist = this.getPlaylist(id);
    this.store.remove(this.collection, playlist);
    this.store.save();
  },
  
  removeAllPlaylists(){
    this.store.removeAll(this.collection);
    this.store.save();
  },
  
  addSong(id, song){
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);
    
    let duration = 0;
    playlist.songs.forEach(function(currentSong){
      duration += parseInt(currentSong.duration);
    });
    
    playlist.duration = duration;
   
    this.store.save();
  },
  
  removeSong(id, songId){
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    _.remove(songs, {id: songId});
    this.store.save();
  },


};

module.exports = playlistStore;
