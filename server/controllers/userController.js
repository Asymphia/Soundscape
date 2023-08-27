const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const SpotifyWebApi = require('spotify-web-api-node')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

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

        res.status(200).json({ userId });
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
}

module.exports = {
    loginUser,
    signupUser,
    authorizeSpotify,
    deleteUser
}