require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/usersRoutes')
const spotifyRoutes = require('./routes/spotifyRoutes')

// express app
const app = express()

// middlewares
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/spotify', spotifyRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to database and listening of port', process.env.PORT)
        })
    })
    .catch(err => {
        console.error(err)
    })