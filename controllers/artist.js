'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const SpotifyStore = require('../models/spotify-store');

const artist = {
    index(request, response) {
        const artistId = request.params.id;
        let artist = {};
        let tracks = {};
        let albums = {};

        (async () => {
            artist = await SpotifyStore.getArtist(artistId);
            tracks = await SpotifyStore.getArtistTracks(artistId);
            albums = await SpotifyStore.getAlbums(artistId);
            await createData(response, artist, tracks, albums);
        }) ();

    },
};

module.exports = artist;

function createData(response, artist, tracks, albums) {
    console.log(albums);
    const viewData = {
        title: artist.name,
        artist: artist,
        tracks: tracks,
        albums: albums
    };

    response.render('artist', viewData);
}