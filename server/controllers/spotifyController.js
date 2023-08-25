const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const SpotifyWebApi = require('spotify-web-api-node')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
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

const getRecommendations = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const id = decodedToken._id

    const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(userId)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    })

    try {
        spotifyApi.setAccessToken(user.spotifyAccessToken)
        spotifyApi.setRefreshToken(user.spotifyRefreshToken)

        // Get user's top tracks to use in recommendations
        const userTopTracks = await getUserTopTracks(spotifyApi)

        // Extract track IDs from user's top tracks
        const trackIds = userTopTracks.topTracksAllTime.map((track) => track.id)

        // Get the number of songs requested in the query parameter (default to 10)
        const limit = parseInt(req.query.limit) || 10

        // Get recommendations based on user's top tracks
        const recommendations = await spotifyApi.getRecommendations({
            seed_tracks: trackIds.slice(0, 5), // Take the first 5 track IDs from user's top tracks
            limit: limit // Limit the number of recommendations to 20 at most
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
        if (err.statusCode === 401) {
            try {
                const newAccessToken = await refreshToken(id);
                spotifyApi.setAccessToken(newAccessToken);

                // Retry fetching recommendations
                const recommendations = await spotifyApi.getRecommendations({
                    seed_tracks: trackIds.slice(0, 5),
                    limit: Math.min(limit)
                })

                const formattedRecommendations = recommendations.body.tracks.map((track) => ({
                    id: track.id,
                    preview_url: track.preview_url,
                    artist: track.album.artists[0].name,
                    image_url: track.album.images[2].url,
                    name: track.name
                }));

                res.status(200).json(formattedRecommendations)
            } catch (refreshErr) {
                res.status(400).json({ error: refreshErr.message })
            }
        } else {
            res.status(400).json({ error: err.message })
        }
    }
}

const createPlaylist = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const userId = decodedToken._id
    const trackIds = req.query.trackIds.split(',')
    const extendedIds = trackIds.map(id => `spotify:track:${id}`)

    const user = await User.findById(userId)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })

    try {
        spotifyApi.setAccessToken(user.spotifyAccessToken)
        spotifyApi.setRefreshToken(user.spotifyRefreshToken)

        const playlistName = 'Soundscape Playlist'
        const createdPlaylist = await spotifyApi.createPlaylist(playlistName, { 'description': 'Playlist Created via Soundscape recommendations', 'public': true })

        const addTracksResponse = await spotifyApi.addTracksToPlaylist(createdPlaylist.body.id, extendedIds)

        res.status(200).json({ playlistId: createdPlaylist.body.id })
    } catch (err) {
        if (err.statusCode === 401) {
            try {
                const newAccessToken = await refreshToken(id);
                spotifyApi.setAccessToken(newAccessToken);

                const playlistName = 'Soundscape Playlist'
                const createdPlaylist = await spotifyApi.createPlaylist(playlistName, { 'description': 'Playlist Created via Soundscape recommendations', 'public': true })

                const addTracksResponse = await spotifyApi.addTracksToPlaylist(createdPlaylist.body.id, extendedIds)

                res.status(200).json({ playlistId: createdPlaylist.body.id })
            } catch (refreshErr) {
                res.status(400).json({ error: refreshErr.message })
            }
        } else {
            res.status(400).json({ error: err.message })
        }
    }
}

const changePlaylistCover = async (req, res) => {
    const playlistId = req.params.playlistId;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken._id;

    const user = await User.findById(userId);

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    try {
        spotifyApi.setAccessToken(user.spotifyAccessToken);
        spotifyApi.setRefreshToken(user.spotifyRefreshToken);

        // Convert playlist cover image to Base64
        const imagePath = path.join(__dirname, '../imgs/playlistCover.jpg');
        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

        // Change the playlist cover image
        await spotifyApi.uploadCustomPlaylistCoverImage(playlistId, imageBase64);

        res.status(200).json({ message: 'Playlist cover image changed successfully.' });
    } catch (err) {
        if (err.statusCode === 401) {
            try {
                const newAccessToken = await refreshToken(userId);
                spotifyApi.setAccessToken(newAccessToken);

                /// Convert playlist cover image to Base64
                const imagePath = path.join(__dirname, '../imgs/playlistCover.jpg');
                const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

                // Change the playlist cover image
                await spotifyApi.uploadCustomPlaylistCoverImage(playlistId, imageBase64);

                res.status(200).json({ message: 'Playlist cover image changed successfully.' });
            } catch (refreshErr) {
                res.status(400).json({ error: refreshErr.message });
            }
        } else {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = { getProfile, getCurrentSong, skipToPreviousSong, skipToNextSong, togglePlayback, getRecommendations, createPlaylist, changePlaylistCover }