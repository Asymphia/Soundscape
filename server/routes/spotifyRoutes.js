const express = require('express')

// controller functions
const { getProfile, getCurrentSong, skipToPreviousSong, skipToNextSong, togglePlayback } = require('../controllers/spotifyController')

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

module.exports = router