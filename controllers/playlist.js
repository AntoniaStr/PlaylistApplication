'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const playlistStore = require('../models/playlist-store');

const playlist = {
  index(request, response) {
    const playlistId = request.params.id;
    logger.debug('Playlist id = ', playlistId);
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getPlaylist(playlistId),
    };
    response.render('playlist', viewData);
  },

  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },
  
  addSong(request, response){
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    var artists = [request.body.artist,];

    const newSong = {
      id: uuid(),
      title: request.body.title,
      artists: artists,
      duration: Number(request.body.duration),
    };
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/'+playlistId);
    logger.debug('New Song = ', newSong);
  },
};

module.exports = playlist;
