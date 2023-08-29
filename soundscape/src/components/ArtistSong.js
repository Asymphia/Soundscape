import top1 from '../imgs/topSongsIcons/top1.svg'
import top2 from '../imgs/topSongsIcons/top2.svg'
import top3 from '../imgs/topSongsIcons/top3.svg'
import previewImg from '../imgs/preview.svg'
import previewImgActive from '../imgs/preview-active.svg'
import previewImgHover from '../imgs/preview-hover.svg'
import { useState } from 'react'

const ArtistSong = ({image, num, name, preview}) => {
    let topImage
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    const changeVolume = (event) => {
        const audio = event.target
        audio.volume = 0.04
    }

    if (num === 0) {
        topImage = top1
    } else if (num === 1) {
        topImage = top2
    } else if (num === 2) {
        topImage = top3
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <div className='font-kanit md:text-sm text-vsm flex sm:flex-nowrap flex-wrap items-center'>
            <img src={image} alt={`Album cover for ${name} song`} className='w-vlg h-vlg rounded-sm sm:mr-md sm:ml-0 ml-auto mr-vsm' />
            <img src={topImage} alt={`Top ${num + 1} song`} className='w-[24px] h-[24px] sm:mr-vsm sm:ml-0 mr-auto ml-vsm' />
            <p className='sm:mr-md sm:w-fit w-full sm:text-left text-center'>
                {name}
            </p>
            <img src={isPlaying ? previewImgActive : isHovered ? previewImgHover : previewImg} onClick={togglePlay} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} alt='preview song' className='cursor-pointer h-[24px] w-[24px] sm:mx-0 mx-auto' />
                {isPlaying && (
                    <audio controls autoPlay className='hidden' onPlay={changeVolume} onEnded={togglePlay}>
                        <source src={preview} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                )}
        </div>
    )
}

export default ArtistSong