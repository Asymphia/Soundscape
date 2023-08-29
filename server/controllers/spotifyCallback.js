const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const { encrypt } = require('../assets/encryption')

const router = express.Router()

router.get('/spotify-callback', async (req, res) => {
    const code = req.query.code
    const userId = req.query.state

    // Exchange the authorization code for access token
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    })

    try {
        const data = await spotifyApi.authorizationCodeGrant(code)

        const refreshToken = data.body.refresh_token
        const encryptedToken = encrypt(refreshToken)

        const userIdObjectId = new mongoose.Types.ObjectId(userId)
        const user = await User.findByIdAndUpdate(userIdObjectId, {spotifyRefreshToken: encryptedToken})

        if(!user){
            res.status(404).json({error: 'User not found'})
        }

        res.redirect(`http://localhost:3000/login`)
    } catch (err) {
        const userIdObjectId = new mongoose.Types.ObjectId(userId)
        const user = await User.findByIdAndDelete(userIdObjectId)

        res.status(500).redirect('http://localhost:3000/error')
    }
})

module.exports = router