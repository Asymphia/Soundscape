import { useState, useEffect } from 'react'
import { usePlayerContext } from '../hooks/usePlayerContext'
import { useAuthContext } from '../hooks/useAuthContext'
import PlayerController from './PlayerController'

const Player = () => {
    const { user } = useAuthContext()
    const { song, dispatch } = usePlayerContext()

    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setError(null)

            const response = await fetch('/api/spotify/getSong', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }

            if (response.ok) {
                dispatch({type: 'SET_CURRENTLY_PLAYING_SONG', payload: json})
            }
        }

        if (user) {
            fetchData()
            const interval = setInterval(fetchData, 30000)

            return () => {
                clearInterval(interval)
            };
        }
    }, [dispatch, user])

    return (
        <div className='bg-lightgray h-fit w-full text-white md:p-lg p-md rounded-sm'>
            <h2 className='font-nunito font-bold md:text-sm text-vsm mb-lg sm:text-left text-center'>
                Currently playing:
            </h2>
            <div>
                { error && <p className='font-kanit md:text-vsm text-vvsm'>No song is currently playing</p> }
                { song && <PlayerController /> }
            </div>
        </div>
    )
}

export default Player