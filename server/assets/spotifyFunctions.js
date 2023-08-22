const getUser = async (spotifyApi, user) => {
    const getUserData = await spotifyApi.getMe()
    const userData = getUserData.body.images[0].url

    const userEmail = user.email

    return { image: userData, email: userEmail }
}

const getUserTopArtists = async (spotifyApi) => {
    const getTopArtistsAllTime = await spotifyApi.getMyTopArtists({ time_range: 'long_term', limit: 10 })
    const getTopArtists6Months = await spotifyApi.getMyTopArtists({ time_range: 'medium_term', limit: 10 })
    const getTopArtistsLastMonth = await spotifyApi.getMyTopArtists({ time_range: 'short_term', limit: 10 })

    const extractArtistProperties = item => ({
        externalUrl: item.external_urls.spotify,
        id: item.id,
        image: item.images.length >= 3 ? item.images[2].url : null,
        name: item.name
    })

    const topArtistsAllTime = getTopArtistsAllTime.body.items.map(extractArtistProperties)
    const topArtists6Months = getTopArtists6Months.body.items.map(extractArtistProperties)
    const topArtistsLastMonth = getTopArtistsLastMonth.body.items.map(extractArtistProperties)

    return { topArtistsAllTime, topArtists6Months, topArtistsLastMonth }
}

const getUserTopTracks = async (spotifyApi) => {
    const getTopTracksAllTime = await spotifyApi.getMyTopTracks({ time_range: 'long_term', limit: 10 })
    const getTopTracks6Months = await spotifyApi.getMyTopTracks({ time_range: 'medium_term', limit: 10 })
    const getTopTracksLastMonth = await spotifyApi.getMyTopTracks({ time_range: 'short_term', limit: 10 })

    const extractProperties = item => ({
        externalUrl: item.external_urls.spotify,
        id: item.id,
        image: item.album.images.length >= 3 ? item.album.images[2].url : null,
        name: item.name
    })

    const topTracksAllTime = getTopTracksAllTime.body.items.map(extractProperties)
    const topTracks6Months = getTopTracks6Months.body.items.map(extractProperties)
    const topTracksLastMonth = getTopTracksLastMonth.body.items.map(extractProperties)

    return { topTracksAllTime, topTracks6Months, topTracksLastMonth }
}

const getRelatedArtists = async (spotifyApi, topArtistId) => {
    const getRelatedArtists = await spotifyApi.getArtistRelatedArtists(topArtistId)
    const slicedRelatedArtists = getRelatedArtists.body.artists.slice(0, 2)
    const relatedArtists = slicedRelatedArtists.map(artist => ({
        externalUrl: artist.external_urls.spotify,
        genres: artist.genres,
        image: artist.images.length >= 3 ? artist.images[2].url : null,
        name: artist.name
    }))

    return relatedArtists
}

const getTopArtistTrack = async (spotifyApi, topArtistId) => {
    const getTopArtistsTracks = await spotifyApi.getArtistTopTracks(topArtistId, 'US')
    const slicedTopArtistsTracks = getTopArtistsTracks.body.tracks.slice(0, 3)
    const topArtistsTracks = slicedTopArtistsTracks.map(track => ({
        image: track.album.images.length >= 3 ? track.album.images[2].url : null,
        name: track.name,
        previewUrl: track.preview_url
    }))

    return topArtistsTracks
}

module.exports = {
    getUser,
    getUserTopArtists,
    getUserTopTracks,
    getRelatedArtists,
    getTopArtistTrack
}