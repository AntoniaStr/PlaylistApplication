'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const playlistStore = require('../models/playlist-store');
const suggestionsStore = require('../models/suggestions-store');
const spotifySong = require('./song.js');
const spotifyArtist = require('./artist.js');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Playlist Dashboard',
      playlists: playlistStore.getUserPlaylists(loggedInUser.id),
      suggestions: suggestionsStore.getList(),
      track: spotifySong,
      artist: spotifyArtist
    };
    response.render('dashboard', viewData);
    console.log(viewData.playlists);
  },
  deletePlaylist(request, response){
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },
  
  addPlaylist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPlayList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: [],
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
