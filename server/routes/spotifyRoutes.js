const express = require('express')

// controller functions
const { getProfile, getCurrentSong, skipToPreviousSong, skipToNextSong, togglePlayback, getRecommendations, createPlaylist, changePlaylistCover } = require('../controllers/spotifyController')

const router = express.Router()

// spotify profile route
router.get('/getProfile', getProfile)

// spotify current song route
router.get('/getSong', getCurrentSong)

// spotify skip to previous
router.get('/previous', skipToPreviousSong)

// spotify skip to next
router.get('/next', skipToNextSong)

// spotify toggle playback
router.get('/toggle', togglePlayback)

// get recommendations
router.get('/getRecommendations', getRecommendations)

// create playlist
router.post('/createPlaylist', createPlaylist)

// Change the playlist cover image
router.put('/changePlaylistCover/:playlistId', changePlaylistCover);

module.exports = router