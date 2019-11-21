'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const SpotifyStore = require('../models/spotify-store');
const playlistStore = require('../models/playlist-store');

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
        const playlistId = request.body.playlist;

        const newSong = {
            id: request.body.id,
            title: request.body.title,
            artists: [{
                id: request.body.artistId,
                name: request.body.artist,
            }],
            duration: Number(request.body.duration),
        };
        console.log(newSong);
        playlistStore.addSong(playlistId, newSong);
        response.redirect('/playlist/'+ playlistId);
    },
};

module.exports = song;

function createData(response, track){
    console.log(track);
    const viewData = {
        title: track.title,
        track: track
    };
    response.render('song', viewData);
}