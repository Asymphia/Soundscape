import logo from '../imgs/Logo.svg'
import spotifyStats from '../imgs/menuIcons/spotifystats.svg'
import spotifyStatsActive from '../imgs/menuIcons/spotifystats-active.svg'
import createPlaylist from '../imgs/menuIcons/createplaylist.svg'
import createPlaylistActive from '../imgs/menuIcons/createplaylist-active.svg'
import settings from '../imgs/menuIcons/settings.svg'
import settingsActive from '../imgs/menuIcons/settings-active.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useSpotifyContext } from '../hooks/useSpotifyContext'

const Menu = ({ currentPage }) => {
    const { logout } = useLogout()
    const { data } = useSpotifyContext()

    const handleClick = () => {
        logout()
    }

    const backgroundImageStyle = data && data.userData.image
        ? {
            backgroundImage: `url(${data.userData.image})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
        }
        : { backgroundColor: '#33E1ED' }

    return (
        <div className='fixed md:w-[200px] w-[170px] h-screen bg-lightgray py-lg px-md font-kanit md:text-sm text-vsm flex flex-wrap content-between'>
            <img src={logo} alt='Logo' />

            { data &&
                <nav className='space-y-md'>
                    <Link to='/' className={`flex flex-nowrap ${currentPage === 'Spotify Stats' ? 'text-blue' : 'text-white hover:underline'}`} >
                        <img src={currentPage === 'Spotify Stats' ? spotifyStatsActive : spotifyStats} className='mr-vsm' alt='link to Spotify Stats' />
                        Spotify Stats
                    </Link>

                    <Link to='/' className={`flex flex-nowrap ${currentPage === 'Create Playlist' ? 'text-blue' : 'text-white hover:underline'}`} >
                        <img src={currentPage === 'Create Playlist' ? createPlaylistActive : createPlaylist} className='mr-vsm' alt='link to creating playlist' />
                        Create Playlist
                    </Link>

                    <Link to='/' className={`flex flex-nowrap ${currentPage === 'Settings' ? 'text-blue' : 'text-white hover:underline'}`} >
                        <img src={currentPage === 'Settings' ? settingsActive : settings} className='mr-vsm' alt='link to settings' />
                        Settings
                    </Link>
                </nav>
            }

            <div className='text-center w-full'>
                <div style={backgroundImageStyle} className={`w-vlg h-vlg rounded-full m-auto`}></div>
                <p className='text-white mt-vsm mb-lg'>
                    Logged as: <br />
                    { data ? data.userData.email : '...' }
                </p>
                <button onClick={handleClick} className='w-full py-md w-fit bg-blue font-kanit md:text-sm text-vsm rounded-lg transition hover:bg-lightblue'>LOGOUT</button>
            </div>
        </div>
    )
}

export default Menu