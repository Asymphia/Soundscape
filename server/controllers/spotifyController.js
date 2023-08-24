const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const SpotifyWebApi = require('spotify-web-api-node')
const mongoose = require('mongoose')
const {
    getUser,
    getUserTopArtists,
    getUserTopTracks,
    getRelatedArtists,
    getTopArtistTrack,
    getCurrentPlayback
} = require('../assets/spotifyFunctions')

// refresh spotify tokens
const refreshToken = async (id) => {
    const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(userId)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
        refreshToken: user.spotifyRefreshToken
    })

    try{
        const data = await spotifyApi.refreshAccessToken()
        const newAccessToken = data.body['access_token']

        // Update the user's refresh token in the database
        user.spotifyAccessToken = newAccessToken
        await user.save()

        return newAccessToken
    } catch (err) {
        throw err
    }
}

// get all assets
const getAssets = async (spotifyApi, user) => {
    const userData = await getUser(spotifyApi, user)
    const topUserArtists = await getUserTopArtists(spotifyApi)
    const topUserTracks = await getUserTopTracks(spotifyApi)

    const topArtistId = topUserArtists.topArtistsAllTime[0].id

    const relatedArtists = await getRelatedArtists(spotifyApi, topArtistId)
    const topArtistTracks = await getTopArtistTrack(spotifyApi, topArtistId)

    return {
        userData,
        topUserArtists,
        topUserTracks,
        relatedArtists,
        topArtistTracks
    }
}

// get user's profile
const getProfile = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const id = decodedToken._id;

    const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(userId)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })

    // Try to get user data using the current access token
    try {
        spotifyApi.setAccessToken(user.spotifyAccessToken)
        spotifyApi.setRefreshToken(user.spotifyRefreshToken)

        const spofifyStats = await getAssets(spotifyApi, user)

        res.status(200).json(spofifyStats)
    } catch (err) {
        // If the error indicates token expiration, refresh the token
        if (err.statusCode === 401) {
            try {
                const newAccessToken = await refreshToken(id)
                spotifyApi.setAccessToken(newAccessToken); // Update the access token in the API instance


                // Retry fetching user data
                const spofifyStats = await getAssets(spotifyApi, user)

                res.status(200).json(spofifyStats)
            } catch (refreshErr) {
                res.status(400).json({ error: refreshErr.message })
            }
        } else {
            res.status(400).json({ error: err.message })
        }
    }
}

const getCurrentSong = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const id = decodedToken._id

    const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(userId)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })

    try {
        spotifyApi.setAccessToken(user.spotifyAccessToken)
        spotifyApi.setRefreshToken(user.spotifyRefreshToken)

        const currentPlayback = await getCurrentPlayback(spotifyApi)

        if (currentPlayback && currentPlayback.item) {
            const currentSong = {
                name: currentPlayback.item.name,
                artist: currentPlayback.item.artists.map(artist => artist.name).join(', '),
                image: currentPlayback.item.album.images[0].url
            }

            res.status(200).json(currentSong)
        } else {
            res.status(200).json({ message: 'No song currently playing.' })
        }
    } catch (err) {
        if (err.statusCode === 401) {
            try {
                const newAccessToken = await refreshToken(id)
                spotifyApi.setAccessToken(newAccessToken)

                const currentPlayback = await getCurrentPlayback(spotifyApi)

                if (currentPlayback && currentPlayback.item) {
                    const currentSong = {
                        name: currentPlayback.item.name,
                        artist: currentPlayback.item.artists.map(artist => artist.name).join(', '),
                        image: currentPlayback.item.album.images[0].url
                    };

                    res.status(200).json(currentSong);
                } else {
                    res.status(200).json({ message: 'No song currently playing.' });
                }
            } catch (refreshErr) {
                res.status(400).json({ error: refreshErr.message });
            }
        } else {
            res.status(400).json({ error: err.message });
        }
    }
}

const skipToPreviousSong = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const id = decodedToken._id

    const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(userId)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })

    try {
        spotifyApi.setAccessToken(user.spotifyAccessToken)
        spotifyApi.setRefreshToken(user.spotifyRefreshToken)

        await spotifyApi.skipToPrevious()

        res.status(200).json({ message: 'Skipped to previous song.' })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const skipToNextSong = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const id = decodedToken._id

    const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(userId)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })

    try {
        spotifyApi.setAccessToken(user.spotifyAccessToken)
        spotifyApi.setRefreshToken(user.spotifyRefreshToken)

        await spotifyApi.skipToNext()

        res.status(200).json({ message: 'Skipped to next song.' })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const togglePlayback = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const id = decodedToken._id

    const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(userId)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })

    try {
        spotifyApi.setAccessToken(user.spotifyAccessToken)
        spotifyApi.setRefreshToken(user.spotifyRefreshToken)

        const currentPlayback = await getCurrentPlayback(spotifyApi)

        if (currentPlayback && currentPlayback.is_playing) {
            await spotifyApi.pause()
            res.status(200).json({ message: 'Paused the playback.' })
        } else {
            await spotifyApi.play()
            res.status(200).json({ message: 'Resumed the playback.' })
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { getProfile, getCurrentSong, skipToPreviousSong, skipToNextSong, togglePlayback }