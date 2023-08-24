import { useSpotifyContext } from '../hooks/useSpotifyContext'
import Artist from './Artist'

const RelatedArtists = () => {
    const { data } = useSpotifyContext()

    return (
        <div className='bg-lightgray h-fit xl:w-full lg:w-[calc(50%-15px)] w-full xl:ml-[0px] lg:ml-[30px] text-white md:p-lg p-md rounded-sm'>
            <h2 className='font-nunito font-bold md:text-sm text-vsm mb-lg sm:text-left text-center'>
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