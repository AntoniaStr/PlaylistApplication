'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const SpotifyStore = require('../models/spotify-store');

const song = {
    index(request, response) {
        const songId = request.params.id;
        let track = {};

        (async () => {
            track = await SpotifyStore.getSong(songId);
            await createData(response, track);
        }) ();

    },

    addSong(request, response){
        const playlistId = request.params.playlist;

        const newSong = {
            id: request.body.id,
            title: request.body.title,
            artist: request.body.artist,
            artistId: request.body.artistId,
            duration: Number(request.body.duration),
        };

        playlistStore.addSong(playlistId, newSong);
        response.redirect('/playlist/'+ playlistId);
        logger.debug('New Song = ', newSong);
    },
};

module.exports = song;

function createData(response, track){
    console.log(track);
    const viewData = {
        title: track.name,
        track: track
    };
    response.render('song', viewData);
}