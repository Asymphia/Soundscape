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
        <div className='text-white font-kanit text-sm flex flex-nowrap items-center space-x-md'>
            <img src={image} alt={`${name} logo`} className='w-vlg h-vlg rounded-sm mr-md' />
            <p>
                {number + 1}.&ensp;{name}
            </p>
            <a href={url} target='_blank' rel='noreferrer' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img src={isHovered ? spotifyLinkActive : spotifyLink} alt={`Link to ${name} Spotify account`} className='w-[24px] h-[24px]' />
            </a>
        </div>
    )
}

export default StatEl