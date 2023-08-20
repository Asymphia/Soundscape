const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const router = express.Router();

router.get('/spotify-callback', async (req, res) => {
    const code = req.query.code
    const userId = req.query.state

    // Exchange the authorization code for access token
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    try {
        const data = await spotifyApi.authorizationCodeGrant(code);

        const accessToken = data.body.access_token
        const refreshToken = data.body.refresh_token

        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        const user = await User.findByIdAndUpdate(userIdObjectId, {spotifyAccessToken: accessToken})

        if(!user){
            throw new Error('User not found')
        }

        user.spotifyAccessToken = accessToken
        user.spotifyRefreshToken = refreshToken
        await user.save();

        res.redirect(`http://localhost:3000/login`)
    } catch (err) {
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        const user = await User.findByIdAndDelete(userIdObjectId)

        res.status(500).redirect('http://localhost:3000/signup');
    }
});

module.exports = router;