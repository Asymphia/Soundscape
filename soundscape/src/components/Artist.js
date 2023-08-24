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
        <div className='flex sm:flex-nowrap flex-wrap space-x-md'>
            <img src={image} alt={name} className='w-vlg h-vlg rounded-sm sm:mx-0 mx-auto' />
            <div>
                <h4 className='font-kanit md:text-sm text-vsm flex sm:flex-nowrap flex-wrap sm:space-x-md space-x-0 items-center'>
                    <p className='sm:w-fit w-full sm:text-left text-center'>
                        { name }
                    </p>
                    <a href={url} target='_blank' rel="noreferrer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='sm:w-fit w-full'>
                        <img src={isHovered ? spotifyLinkActive : spotifyLink} alt={`Link to ${name}'s Spotify`} className='sm:mx-0 mx-auto' />
                    </a>
                </h4>
                <p className='font-kanit md:text-vsm text-vvsm sm:text-left text-center'>
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