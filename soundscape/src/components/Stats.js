import UserStats from './UserStats'
import BestArtistSongs from './BestArtistSongs'
import RelatedArtists from './RelatedArtists'
import Player from './Player'

const Stats = () => {
    return (
        <div className='md:w-[calc(100%-200px)] w-[calc(100%-170px)] min-h-screen h-fit xl:space-x-lg xl:space-y-[0px] space-x-[0px] md:space-y-lg space-y-md md:p-lg p-md md:ml-[200px] ml-[170px] flex xl:flex-nowrap flex-wrap'>
            <UserStats />
            <div className='xl:w-2/5 w-full h-fit md:space-y-lg space-y-md flex flex-wrap'>
                <Player />
                <BestArtistSongs />
                <RelatedArtists />
            </div>
        </div>
    )
}

export default Stats