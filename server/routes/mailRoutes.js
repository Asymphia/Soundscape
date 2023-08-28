const express = require('express')

// controller functions
const { sendEmail, sendResetCode } = require('../controllers/mailController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

// send message route
router.post('/sendEmail', requireAuth, sendEmail)

// send reset code route
router.post('/sendResetCode', sendResetCode)

module.exports = router