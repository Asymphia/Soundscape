const express = require('express')
const spotifyCallback = require('../controllers/spotifyCallback');

// controller functions
const { loginUser, signupUser, authorizeSpotify, deleteUser, checkCode, resetPassword } = require('../controllers/userController')
const requireAuth = require('../middlewares/requireAuth')

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
router.delete('/delete', requireAuth, deleteUser)

// check password reset code
router.post('/checkCode', checkCode)

// reset password
router.post('/resetPassword', resetPassword)

module.exports = router