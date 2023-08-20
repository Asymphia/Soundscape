const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const SpotifyWebApi = require('spotify-web-api-node')
const mongoose = require('mongoose')

// get user's profile
const getProfile = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const id = decodedToken._id;

    const userId = new mongoose.Types.ObjectId(id);
    const user = await User.findById(userId);

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })

    // Try to get user data using the current access token
    try {
        spotifyApi.setAccessToken(user.spotifyAccessToken);
        spotifyApi.setRefreshToken(user.spotifyRefreshToken);

        // get top artists
        const getTopArtistsAllTime = await spotifyApi.getMyTopArtists({ time_range: 'long_term', limit: 10 });
        const getTopArtists6Months = await spotifyApi.getMyTopArtists({ time_range: 'medium_term', limit: 10 });
        const getTopArtistsLastMonth = await spotifyApi.getMyTopArtists({ time_range: 'short_term', limit: 10 });

        const extractArtistProperties = item => ({
            externalUrl: item.external_urls.spotify,
            id: item.id,
            image: item.images.length >= 3 ? item.images[2].url : null,
            name: item.name
        });

        const topArtistsAllTime = getTopArtistsAllTime.body.items.map(extractArtistProperties);
        const topArtists6Months = getTopArtists6Months.body.items.map(extractArtistProperties);
        const topArtistsLastMonth = getTopArtistsLastMonth.body.items.map(extractArtistProperties);

        // get top tracks
        const getTopTracksAllTime = await spotifyApi.getMyTopTracks({ time_range: 'long_term', limit: 10 })
        const getTopTracks6Months = await spotifyApi.getMyTopTracks({ time_range: 'medium_term', limit: 10 })
        const getTopTracksLastMonth = await spotifyApi.getMyTopTracks({ time_range: 'short_term', limit: 10 })

        const extractProperties = item => ({
            externalUrl: item.external_urls.spotify,
            id: item.id,
            image: item.album.images.length >= 3 ? item.album.images[2].url : null,
            name: item.name
        });

        const topTracksAllTime = getTopTracksAllTime.body.items.map(extractProperties);
        const topTracks6Months = getTopTracks6Months.body.items.map(extractProperties);
        const topTracksLastMonth = getTopTracksLastMonth.body.items.map(extractProperties);

        const topArtistId = topArtistsAllTime[0].id

        // get related artists
        const getRelatedArtists = await spotifyApi.getArtistRelatedArtists(topArtistId)
        const slicedRelatedArtists = getRelatedArtists.body.artists.slice(0, 2)
        const relatedArtists = slicedRelatedArtists.map(artist => ({
            externalUrl: artist.external_urls.spotify,
            genres: artist.genres,
            image: artist.images.length >= 3 ? artist.images[2].url : null,
            name: artist.name
        }));

        // get top tracks by top artist
        const getTopArtistsTracks = await spotifyApi.getArtistTopTracks(topArtistId, 'US');
        const slicedTopArtistsTracks = getTopArtistsTracks.body.tracks.slice(0, 3)
        const topArtistsTracks = slicedTopArtistsTracks.map(track => ({
            image: track.album.images.length >= 3 ? track.album.images[2].url : null,
            name: track.name,
            previewUrl: track.preview_url
        }));


        res.status(200).json({
            topArtists: {
                topArtistsAllTime,
                topArtists6Months,
                topArtistsLastMonth
            },
            topTracks: {
                topTracksAllTime,
                topTracks6Months,
                topTracksLastMonth
            },
            relatedArtists,
            topArtistsTracks
        });
    } catch (err) {
        // If the error indicates token expiration, refresh the token
        if (err.statusCode === 401) {
            try {
                const data = await spotifyApi.refreshAccessToken();
                const newAccessToken = data.body['access_token'];
                const newRefreshToken = data.body['refresh_token'];

                // Update the user's refresh token in the database
                user.spotifyAccessToken = newAccessToken;
                user.spotifyRefreshToken = newRefreshToken;
                await user.save();

                spotifyApi.setAccessToken(newAccessToken); // Update the access token in the API instance
                spotifyApi.setRefreshToken(newRefreshToken); // Update the refresh token in the API instance

                // Retry fetching user data
                const userData = await spotifyApi.getMe();
                res.status(200).json({ userData });
            } catch (refreshErr) {
                res.status(400).json({ error: refreshErr.message });
            }
        } else {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = { getProfile }