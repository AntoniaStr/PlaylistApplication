'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const SpotifyStore = require('../models/spotify-store');

const search = {

    index(request, response) {
        const viewData = {};
        response.render('search', viewData);
    },

    result(request, response) {
        const queryTerm = request.body.queryTerm;
        let tracks = {};
        let artists = {};

        (async () => {
            tracks = await SpotifyStore.searchTracks(queryTerm);
            artists = await SpotifyStore.searchArtists(queryTerm);
            await createData(response, tracks, artists);
        }) ();

    },
};

module.exports = search;

function createData(response, tracks, artists){

    const viewData = {
        title: 'Search Results',
        tracks: tracks,
        artists: artists
    };
    response.render('search', viewData);
}