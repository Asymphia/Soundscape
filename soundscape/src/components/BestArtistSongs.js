import { useSpotifyContext } from '../hooks/useSpotifyContext'
import ArtistSong from './ArtistSong'

const BestArtistSongs = () => {
    const { data } = useSpotifyContext()

    return (
        <div className='bg-lightgray h-fit text-white p-lg rounded-sm'>
            <h2 className='font-nunito font-bold text-sm mb-lg'>
                The best {data.topUserArtists.topArtistsAllTime[0].name} songs:
            </h2>
            <div className='space-y-md'>
                {
                    data && data.topArtistTracks.map((el, index) => (
                        <ArtistSong key={index} image={el.image} num={index} name={el.name} preview={el.previewUrl} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestArtistSongs