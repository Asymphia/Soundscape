const express = require('express')
const spotifyCallback = require('../controllers/spotifyCallback');

// controller functions
const { loginUser, signupUser, authorizeSpotify, deleteUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// spotify auth route
router.post('/auth', authorizeSpotify)

// Spotify callback route
router.use('/', spotifyCallback)

// delete user
router.delete('/delete', deleteUser)

module.exports = router