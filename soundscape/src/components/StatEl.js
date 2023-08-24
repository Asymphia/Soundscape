import spotifyLink from '../imgs/spotifylink.svg'
import spotifyLinkActive from '../imgs/spotifylink-active.svg'
import { useState } from 'react'

const StatEl = ({image, number, name, url}) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div className='text-white font-kanit md:text-sm text-vsm flex sm:flex-nowrap flex-wrap items-center space-x-md'>
            <img src={image} alt={`${name} logo`} className='w-vlg h-vlg rounded-sm sm:mr-md sm:mx-0 mx-auto' />
            <p className='sm:w-fit w-full sm:text-left text-center'>
                {number + 1}.&ensp;{name}
            </p>
            <a href={url} target='_blank' rel='noreferrer' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='sm:w-fit w-full'>
                <img src={isHovered ? spotifyLinkActive : spotifyLink} alt={`Link to ${name} Spotify account`} className='w-[24px] h-[24px] mx-auto' />
            </a>
        </div>
    )
}

export default StatEl