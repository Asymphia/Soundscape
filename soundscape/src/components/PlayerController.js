import { usePlayerContext } from '../hooks/usePlayerContext'
import playerNext from '../imgs/playerIcons/player-next.svg'
import playerNextActive from '../imgs/playerIcons/player-next-active.svg'
import playerPause from '../imgs/playerIcons/player-pause.svg'
import playerPauseActive from '../imgs/playerIcons/player-pause-active.svg'
import playerPrevious from '../imgs/playerIcons/player-previous.svg'
import playerPreviousActive from '../imgs/playerIcons/player-previous-active.svg'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const PlayerController = () => {
    const { song, dispatch } = usePlayerContext()
    const { user } = useAuthContext()
    const [isPreviousHovered, setIsPreviousHovered] = useState(false)
    const [isPauseHovered, setIsPauseHovered] = useState(false)
    const [isNextHovered, setIsNextHovered] = useState(false)
    const [error, setError] = useState(false)

    const fetchCurrentlyPlayingSong = async () => {
        const response = await fetch('/api/spotify/getSong', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(true)
        }

        if (response.ok) {
            dispatch({type: 'SET_CURRENTLY_PLAYING_SONG', payload: json})
            setError(false)
        }
    }

    const handlePrevious = async () => {
        setError(false)
        const response = await fetch('/api/spotify/previous', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if(!response.ok){
            setError(true)
        }

        if (response.ok) {
            fetchCurrentlyPlayingSong()
            setError(false)
        }
    }

    const handleNext = async () => {
        setError(false)
        const response = await fetch('/api/spotify/next', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if(!response.ok){
            setError(true)
        }

        if (response.ok) {
            fetchCurrentlyPlayingSong()
            setError(false)
        }
    }

    const handleToggle = async () => {
        setError(false)
        const response = await fetch('/api/spotify/toggle', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if(!response.ok){
            setError(true)
        }

        if(response.ok){
            setError(false)
        }
    }

    return (
        <div>
            { error || song.message && <p className='font-kanit md:text-vsm text-vvsm'>No song is currently playing</p> }
            { !error && !song.message &&
                <>
                    <img src={song.image} alt={`${song.name} song cover`} className='h-[120px] w-[120px] rounded-sm m-auto' />
                    <p className='font-kanit md:text-vsm text-vvsm text-center mt-md mb-vsm'>
                        {song.artist} - {song.name}
                    </p>
                    <div className='flex flex-nowrap w-fit m-auto space-x-md'>
                        <img src={isPreviousHovered ? playerPreviousActive : playerPrevious} alt='Previous song' className='h-[24px] w-[24px] cursor-pointer' onMouseEnter={() => setIsPreviousHovered(true)} onMouseLeave={() => setIsPreviousHovered(false)} onClick={handlePrevious}/>
                        <img src={isPauseHovered ? playerPauseActive : playerPause} alt='Pause song' className='h-[24px] w-[24px] cursor-pointer' onMouseEnter={() => setIsPauseHovered(true)} onMouseLeave={() => setIsPauseHovered(false)} onClick={handleToggle}/>
                        <img src={isNextHovered ? playerNextActive : playerNext} alt='Next song' className='h-[24px] w-[24px] cursor-pointer' onMouseEnter={() => setIsNextHovered(true)} onMouseLeave={() => setIsNextHovered(false)} onClick={handleNext}/>
                    </div>
                </>
            }
        </div>
    )
}

export default PlayerController