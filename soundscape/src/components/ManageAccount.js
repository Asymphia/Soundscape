import arrow from '../imgs/arrow-right.png'

const ManageAccount = () => {
    return (
        <div className='bg-lightgray h-fit w-full text-white md:p-lg p-md rounded-sm'>
            <h2 className='font-nunito font-bold md:text-sm text-vsm mb-lg text-center'>
                Manage Spotify Account
            </h2>
            <div className='text-center font-kanit md:text-vsm text-vvsm space-y-md'>
                <p>
                    Manage your Spotify account settings directly on Spotify´s site
                </p>
                <a href='https://www.spotify.com/pl/account/apps/' target='_blank' rel='noreferrer' className='block hover:underline'>
                    Head to Spotify
                    <img src={arrow} alt='Head to Spotify' className='inline h-[24px] w-[24px]' />
                </a>
            </div>
        </div>
    )
}

export default ManageAccount