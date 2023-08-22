import spotifyLink from '../imgs/spotifylink.svg'
import spotifyLinkActive from '../imgs/spotifylink-active.svg'
import { useState } from 'react'

const Artist = ({image, name, url, genres}) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <div className='flex flex-nowrap space-x-md'>
            <img src={image} alt={name} className='w-vlg h-vlg rounded-sm' />
            <div>
                <h4 className='font-kanit text-sm flex flex-nowrap space-x-md items-center'>
                    <p>{ name }</p>
                    <a href={url} target='_blank' rel="noreferrer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <img src={isHovered ? spotifyLinkActive : spotifyLink} alt={`Link to ${name}'s Spotify`} />
                    </a>
                </h4>
                <p className='font-kanit text-vsm'>
                    Genres:&nbsp;
                    {genres.map(genre => (
                        genre
                    ))}
                </p>
            </div>
        </div>
    )
}

export default Artist