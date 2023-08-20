import loginVideo from '../imgs/loginAnimation.mp4'
import registerVideo from '../imgs/signupAnimation.mp4'
import logo from '../imgs/Logo.svg'
import { useLocation } from 'react-router-dom'

const LoginRegisterVideo = () => {
    let bgVideo, url
    const path = useLocation().pathname

    if(path === '/login'){
        bgVideo = loginVideo
        url = 'https://youtu.be/koSM9dpk7uU'
    }
    if(path === '/signup'){
        bgVideo = registerVideo
        url = 'https://youtu.be/LdviVDgM_4o'
    }

    return (
        <div className='relative sm:h-screen sm:w-1/2 w-full h-[40vh]'>
            <video className="video-bg sm:fixed sm:top-0 sm:left-0 sm:w-[50vw] sm:h-screen h-[40vh] w-full" autoPlay muted loop>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div className='text-white sm:fixed absolute top-0 left-0 sm:bg-gray-transparent sm:bg-none bg-gradient sm:h-screen h-[40vh] sm:w-[50vw] w-full font-nunito md:p-lg p-md lg:pr-xl pr-md flex flex-wrap content-between'>
                <div className='w-full'>
                    <img src={logo} className='md:w-[170px] sm:w-[130px] w-[300px] sm:m-0 mx-auto mt-[calc(20vh-65px)]' alt='logo' />
                </div>
                <div className='md:space-y-md space-y-vsm sm:block hidden'>
                    <h1 className='font-nunito font-black md:text-lg text-md'>
                        Spotify Music Insights
                    </h1>
                    <h3 className='font-kanit md:text-md text-sm'>
                        Unlock your Spotify music insights and discover your listening trends.
                    </h3>
                </div>
                <div className='w-full'>
                    <p className='font-kanit md:text-sm sm:text-vsm text-vvsm text-center sm:opacity-100 opacity-30'>
                        Video by <a className='underline' href={url} target="_blank" rel="noreferrer">Eli Eli</a> on YouTube
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginRegisterVideo