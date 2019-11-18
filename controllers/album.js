'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const SpotifyStore = require('../models/spotify-store');

const album = {
    index(request, response) {
        const albumId = request.params.id;
        let album = {};
        let moreAlbums = {};

        (async () => {
            album = await SpotifyStore.getAlbum(albumId);
            moreAlbums = await SpotifyStore.getAlbums(album.artists[0].id);
            await createData(response, album, moreAlbums);
        }) ();

    },
};

module.exports = album;

function createData(response, album, moreAlbums) {
    console.log(moreAlbums);
    const viewData = {
        title: album.name,
        album: album,
        moreAlbums: moreAlbums
    };

    response.render('album', viewData);
}