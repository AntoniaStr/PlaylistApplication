'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const playlist = require('./controllers/playlist.js');
const accounts = require('./controllers/accounts.js');
const song = require('./controllers/song.js');
const artist = require('./controllers/artist.js');
const album = require('./controllers/album.js');
const search = require('./controllers/search.js');

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);

router.get('/about', about.index);
router.get('/playlist/:id', playlist.index);
router.get('/playlist/:id/deletesong/:songid', playlist.deleteSong);
router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/song/addsong', song.addSong);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/song/:id', song.index);
router.get('/artist/:id', artist.index);
router.get('/album/:id', album.index);

router.get('/search', search.index);
router.post('/search/search', search.search);

module.exports = router;
