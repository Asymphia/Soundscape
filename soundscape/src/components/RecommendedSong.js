import previewImg from '../imgs/preview.svg'
import previewImgActive from '../imgs/preview-active.svg'
import previewImgHover from '../imgs/preview-hover.svg'
import {useState} from 'react'

const RecommendedSong = ({ name, artist, image, preview }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    const changeVolume = (event) => {
        const audio = event.target
        audio.volume = 0.04
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div className='flex sm:flex-nowrap flex-wrap space-x-md text-white items-center'>
            <img src={image} alt={name} className='w-vlg h-vlg rounded-sm sm:mx-0 mx-auto' />
            <div>
                <h4 className='font-kanit md:text-sm text-vsm flex sm:flex-nowrap flex-wrap sm:space-x-md space-x-0 items-center'>
                    <p className='sm:w-fit w-full sm:text-left text-center'>
                        { name }
                    </p>

                    <img src={isPlaying ? previewImgActive : isHovered ? previewImgHover : previewImg} onClick={togglePlay} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} alt='preview song' className='cursor-pointer h-[24px] w-[24px] sm:mx-0 mx-auto' />
                    {isPlaying && (
                        <audio controls autoPlay className='hidden' onPlay={changeVolume} onEnded={togglePlay}>
                            <source src={preview} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </h4>
                <p className='font-kanit md:text-vsm text-vvsm sm:text-left text-center'>
                    {artist}
                </p>
            </div>
        </div>
    )
}

export default RecommendedSong