const express = require('express')

// controller functions
const { getProfile } = require('../controllers/spotifyController')

const router = express.Router()

// spotify profile route
router.get('/getProfile', getProfile)

module.exports = router