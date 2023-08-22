import UserStats from './UserStats'
import BestArtistSongs from './BestArtistSongs'
import RelatedArtists from './RelatedArtists'

const Stats = () => {
    return (
        <div className='w-[calc(100%-200px)] min-h-screen h-fit space-x-lg p-lg ml-[200px] flex'>
            <UserStats />
            <div className='w-2/5 h-fit space-y-lg'>
                <BestArtistSongs />
                <RelatedArtists />
            </div>
        </div>
    )
}

export default Stats