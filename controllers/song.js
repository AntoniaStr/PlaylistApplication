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