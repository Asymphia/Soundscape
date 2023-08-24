import { useState, useEffect } from 'react'
import { useSpotifyContext } from '../hooks/useSpotifyContext'
import StatEl from './StatEl'

const UserStats = () => {
    const [currentStats, setCurrentStats] = useState('artists')
    const [currentTimestamp, setCurrentTimestamp] = useState('all time')
    const { data } = useSpotifyContext()
    const [stats, setStats] = useState('')

    useEffect(() => {
        if(data){
            if(currentStats === 'artists' && currentTimestamp === 'all time'){
                setStats(data.topUserArtists.topArtistsAllTime)
            } else if(currentStats === 'artists' && currentTimestamp === '6 months'){
                setStats(data.topUserArtists.topArtists6Months)
            } else if(currentStats === 'artists' && currentTimestamp === 'last month'){
                setStats(data.topUserArtists.topArtistsLastMonth)
            } else if(currentStats === 'tracks' && currentTimestamp === 'all time'){
                setStats(data.topUserTracks.topTracksAllTime)
            } else if(currentStats === 'tracks' && currentTimestamp === '6 months'){
                setStats(data.topUserTracks.topTracks6Months)
            } else if(currentStats === 'tracks' && currentTimestamp === 'last month'){
                setStats(data.topUserTracks.topTracksLastMonth)
            }
        }

    }, [data, currentStats, currentTimestamp])

    const handleClick = (value) => {
        setCurrentStats(value)
    }

    const handleTimestampChange = (value) => {
        setCurrentTimestamp(value)
    }

    return (
        <div className='bg-lightgray xl:w-3/5 w-full h-fit font-kanit md:p-lg p-md rounded-sm'>
            <div className='w-full flex sm:flex-nowrap flex-wrap md:space-x-lg sm:space-x-sm space-x-[0px] sm:space-y-[0px] space-y-sm mb-lg'>
                <button className={`sm:w-1/2 w-full py-md md:text-sm text-vsm rounded-full transition 
                border-[1px] border-solid border-blue
                ${currentStats === 'artists' ? 'bg-blue text-gray' : 'bg-lightgrey text-white hover:border-lightblue'}`}
                onClick={() => handleClick('artists')}>
                    TOP ARTISTS
                </button>
                <button className={`sm:w-1/2 w-full py-md md:text-sm text-vsm rounded-full transition 
                border-[1px] border-solid border-blue
                ${currentStats === 'tracks' ? 'bg-blue text-gray' : 'bg-lightgrey text-white hover:border-lightblue'}`}
                onClick={() => handleClick('tracks')}>
                    TOP TRACKS
                </button>
            </div>
            <div className='w-full flex sm:flex-nowrap flex-wrap md:space-x-lg sm:space-x-sm space-x-[0px] sm:space-y-[0px] space-y-sm mb-[45px]'>
                <button className={`sm:w-1/3 w-full py-md md:text-vsm text-vvsm rounded-full transition 
                border-[1px] border-solid border-lightblue
                ${currentTimestamp === 'all time' ? 'bg-lightblue text-gray' : 'bg-lightgrey text-white hover:border-blue'}`}
                onClick={() => handleTimestampChange('all time')}>
                    ALL TIME
                </button>
                <button className={`sm:w-1/3 w-full py-md md:text-vsm text-vvsm rounded-full transition 
                border-[1px] border-solid border-lightblue
                ${currentTimestamp === '6 months' ? 'bg-lightblue text-gray' : 'bg-lightgrey text-white hover:border-blue'}`}
                onClick={() => handleTimestampChange('6 months')}>
                   6 MONTHS
                </button>
                <button className={`sm:w-1/3 w-full py-md md:text-vsm text-vvsm rounded-full transition 
                border-[1px] border-solid border-lightblue
                ${currentTimestamp === 'last month' ? 'bg-lightblue text-gray' : 'bg-lightgrey text-white hover:border-blue'}`}
                onClick={() => handleTimestampChange('last month')}>
                    LAST MONTH
                </button>
            </div>
            <div className='space-y-md'>
                {
                    stats && stats.map((el, index) => (
                        <StatEl key={el.id} image={el.image} number={index} name={el.name} url={el.externalUrl} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserStats