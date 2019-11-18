'use strict';

const _ = require('lodash');
const spotifyApi = require('../spotifyapi');

const spotifyStore = {

    getArtist(artistId) {
        return spotifyApi.getArtist(artistId).then(data => {return data.body } ).catch(function(error) { console.error(error); });
    },

    getArtistTracks(artistId) {
        return spotifyApi.getArtistTopTracks(artistId, "NL").then(data => {return data.body } ).catch(function(error) { console.error(error); });
    },

    getAlbums(artistId) {
        return spotifyApi.getArtistAlbums(artistId, { include_groups: "album"}).then(data => {return data.body } ).catch(function(error) { console.error(error); });
    },

    getAlbum(albumId){
        return spotifyApi.getAlbum(albumId).then(data => {return data.body}).catch(function(error){console.error(error);});
    },

    getSong(songId) {
        return spotifyApi.getTrack(songId).then(data => {
            //console.log(data.body);
            return data.body;
        } ).catch(function(error) { console.error(error); });
    }


};

module.exports = spotifyStore;