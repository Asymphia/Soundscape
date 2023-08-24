import { useAuthContext } from '../hooks/useAuthContext'
import { useState, useEffect } from 'react'
import Menu from '../components/Menu'
import { useSpotifyContext } from '../hooks/useSpotifyContext'
import Stats from '../components/Stats'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

const SpotifyStats = () => {
    const { user } = useAuthContext()
    const { data, dispatch } = useSpotifyContext()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)

            const response = await fetch('/api/spotify/getProfile', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }

            if (response.ok) {
                setIsLoading(false)
                dispatch({type: 'SET_SPOTIFY_DATA', payload: json})
            }
        }

        if(user){
            fetchData()
        }
    }, [dispatch, user])

    return (
        <div>
            <Menu currentPage={'Spotify Stats'}  />
            <div className='bg-gray w-full'>
                { isLoading && <Loading /> }
                { error && <p>{ error }</p> }
                { data && <Stats /> }
            </div>
            <Footer />
        </div>
    )
}

export default SpotifyStats