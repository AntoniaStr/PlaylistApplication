const dotenv = require('dotenv');
dotenv.config();

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

spotifyApi.clientCredentialsGrant()
    .then(function (data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    })
    .catch(function (err) {
        console.log('Something went wrong!', err);
    });

module.exports = spotifyApi;