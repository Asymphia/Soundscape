const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const SpotifyWebApi = require('spotify-web-api-node')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const {
    getUser,
    getUserTopArtists,
    getUserTopTracks,
    getRelatedArtists,
    getTopArtistTrack,
    getCurrentPlayback
} = require('../assets/spotifyFunctions')
const { decrypt } = require('../assets/encryption')

const getToken = async (id) => {
    const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(userId)

    if(!user){
        throw Error('User not found')
    }

    const refreshToken = decrypt(user.spotifyRefreshToken)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
        refreshToken: refreshToken
    })

    try {
        const accessToken = await spotifyApi.getAccessToken()
        spotifyApi.setAccessToken(accessToken)
        await spotifyApi.getMe()

        return accessToken
    } catch (err) {
        try {
            const data = await spotifyApi.refreshAccessToken()
            const newAccessToken = data.body['access_token']

            return newAccessToken
        } catch (refreshErr) {
            throw refreshErr
        }
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
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const id = decodedToken._id

        const userId = new mongoose.Types.ObjectId(id)
        const user = await User.findById(userId)

        if(!user){
            res.status(404).json('User not found')
        }

        const refreshToken = decrypt(user.spotifyRefreshToken)

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
            refreshToken: refreshToken
        })

        const accessToken = await getToken(id)
        spotifyApi.setAccessToken(accessToken)

        const spofifyStats = await getAssets(spotifyApi, user)

        res.status(200).json(spofifyStats)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getCurrentSong = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const id = decodedToken._id

        const userId = new mongoose.Types.ObjectId(id)
        const user = await User.findById(userId)

        if(!user){
            res.status(404).json('User not found')
        }

        const refreshToken = decrypt(user.spotifyRefreshToken)

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
            refreshToken: refreshToken
        })

        const accessToken = await getToken(id)
        spotifyApi.setAccessToken(accessToken)

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
        res.status(400).json({ error: err.message })
    }
}

const skipToPreviousSong = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const id = decodedToken._id

        const userId = new mongoose.Types.ObjectId(id)
        const user = await User.findById(userId)

        if(!user){
            res.status(404).json('User not found')
        }

        const refreshToken = decrypt(user.spotifyRefreshToken)

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
            refreshToken: refreshToken
        })

        const accessToken = await getToken(id)
        spotifyApi.setAccessToken(accessToken)

        await spotifyApi.skipToPrevious()

        res.status(200).json({ message: 'Skipped to previous song.' })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const skipToNextSong = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const id = decodedToken._id

        const userId = new mongoose.Types.ObjectId(id)
        const user = await User.findById(userId)

        if(!user){
            res.status(404).json('User not found')
        }

        const refreshToken = decrypt(user.spotifyRefreshToken)

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
            refreshToken: refreshToken
        })

        const accessToken = await getToken(id)
        spotifyApi.setAccessToken(accessToken)

        await spotifyApi.skipToNext()

        res.status(200).json({ message: 'Skipped to next song.' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const togglePlayback = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const id = decodedToken._id

        const userId = new mongoose.Types.ObjectId(id)
        const user = await User.findById(userId)

        if(!user){
            res.status(404).json('User not found')
        }

        const refreshToken = decrypt(user.spotifyRefreshToken)

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
            refreshToken: refreshToken
        })

        const accessToken = await getToken(id)
        spotifyApi.setAccessToken(accessToken)

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

const getRecommendations = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const id = decodedToken._id

        const userId = new mongoose.Types.ObjectId(id)
        const user = await User.findById(userId)

        if(!user){
            res.status(404).json('User not found')
        }

        const refreshToken = decrypt(user.spotifyRefreshToken)

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
            refreshToken: refreshToken
        })

        const accessToken = await getToken(id)
        spotifyApi.setAccessToken(accessToken)

        const userTopTracks = await getUserTopTracks(spotifyApi)

        const trackIds = userTopTracks.topTracksAllTime.map((track) => track.id)

        const limit = parseInt(req.query.limit) || 10

        const recommendations = await spotifyApi.getRecommendations({
            seed_tracks: trackIds.slice(0, 5),
            limit: limit
        })

        const formattedRecommendations = recommendations.body.tracks.map((track) => ({
            id: track.id,
            preview_url: track.preview_url,
            artist: track.album.artists[0].name,
            image_url: track.album.images[2].url,
            name: track.name
        }));

        res.status(200).json(formattedRecommendations)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const createPlaylist = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const userId = decodedToken._id
        const trackIds = req.query.trackIds.split(',')
        const extendedIds = trackIds.map(id => `spotify:track:${id}`)

        const id = new mongoose.Types.ObjectId(userId)
        const user = await User.findById(id)

        if(!user){
            res.status(404).json('User not found')
        }

        const refreshToken = decrypt(user.spotifyRefreshToken)

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
            refreshToken: refreshToken
        })

        const accessToken = await getToken(id)
        spotifyApi.setAccessToken(accessToken)

        const playlistName = 'Soundscape Playlist'
        const createdPlaylist = await spotifyApi.createPlaylist(playlistName, { 'description': 'Playlist Created via Soundscape recommendations', 'public': true })

        const addTracksResponse = await spotifyApi.addTracksToPlaylist(createdPlaylist.body.id, extendedIds)

        res.status(200).json({ playlistId: createdPlaylist.body.id })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const changePlaylistCover = async (req, res) => {
    try {
        const playlistId = req.params.playlistId
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const userId = decodedToken._id

        const id = new mongoose.Types.ObjectId(userId)
        const user = await User.findById(id)

        if(!user){
            res.status(404).json('User not found')
        }

        const refreshToken = decrypt(user.spotifyRefreshToken)

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
            refreshToken: refreshToken
        })

        const accessToken = await getToken(id)
        spotifyApi.setAccessToken(accessToken)

        const imagePath = path.join(__dirname, '../imgs/playlistCover.jpg')
        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' })

        await spotifyApi.uploadCustomPlaylistCoverImage(playlistId, imageBase64)

        res.status(200).json({ message: 'Playlist cover image changed successfully.' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { getProfile, getCurrentSong, skipToPreviousSong, skipToNextSong, togglePlayback, getRecommendations, createPlaylist, changePlaylistCover }