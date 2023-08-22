import { useSpotifyContext } from '../hooks/useSpotifyContext'
import Artist from './Artist'

const RelatedArtists = () => {
    const { data } = useSpotifyContext()

    return (
        <div className='bg-lightgray h-fit text-white p-lg rounded-sm'>
            <h2 className='font-nunito font-bold text-sm mb-lg'>
                Artists related to {data.topUserArtists.topArtistsAllTime[0].name}:
            </h2>
            <div className='space-y-md'>
                {
                    data && data.relatedArtists.map((el, index) => (
                        <Artist key={index} image={el.image} name={el.name} url={el.externalUrl} genres={el.genres} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedArtists