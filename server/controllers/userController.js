const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const SpotifyWebApi = require('spotify-web-api-node')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({ token })
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
        const userId = user._id

        res.status(200).json({ userId })
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// authorize spotify
const authorizeSpotify = async (req, res) => {
    const { userId } = req.body

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })

    const scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'user-read-playback-state', 'user-read-currently-playing', 'user-modify-playback-state', 'playlist-modify-public', 'playlist-modify-private', 'ugc-image-upload']

    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, userId, true)

    res.status(200).json({ authorizeURL })
}

// delete user
const deleteUser = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const userId = decodedToken._id

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(404).json({error: 'No such user'})
        }

        const user = await User.findOneAndDelete({_id: userId})

        if(!user){
            return res.status(404).json({error: 'No such user'})
        }

        res.status(200).json(user)
    } catch (err){
        res.status(500).json({error: err.message})
    }
}

// check reset password code
const checkCode = async (req, res) => {
    try{
        const { email, resetCode } = req.body

        const user = await User.findOne({ email: email })
        if(!user){
            return res.status(404).json({error: 'User not found.'})
        }

        if(user.resetCode !== resetCode) {
            return res.status(400).json({ error: 'Invalid reset code.'})
        }

        if(user.resetCodeExpiration < Date.now()){
            return res.status(400).json({ error: 'Reset code has expired.' })
        }

        res.status(200).json({message: 'The correct code has been entered'})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// reset password
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body

        const user = await User.findOne({ email: email })
        if(!user){
            return res.status(404).json({error: 'User not found.'})
        }

        if(!validator.isStrongPassword(newPassword)){
            return res.status(400).json({error: 'Password is not strong enough'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword
        user.resetCode = null
        user.resetCodeExpiration = null
        await user.save()

        res.status(200).json({ message: 'Password reset successful.'})
    } catch (err){
        res.status(500).json({error: err.message})
    }
}


module.exports = {
    loginUser,
    signupUser,
    authorizeSpotify,
    deleteUser,
    checkCode,
    resetPassword
}