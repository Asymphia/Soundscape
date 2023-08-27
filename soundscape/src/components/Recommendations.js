import RecommendedSong from './RecommendedSong'

const Recommendations = ({ data, onClick, error, disabled }) => {
    return (
        <div className='bg-lightgray w-fit max-w-[calc(100vw-185px)] h-fit md:p-lg p-md rounded-sm text-center'>
            <h2 className='font-nunito font-bold text-white md:text-sm text-vsm mb-lg text-center'>
                Playlist based on your stats:
            </h2>
            <div className='space-y-md'>
                {
                    data.map(el => (
                        <RecommendedSong key={el.id} name={el.name} artist={el.artist} image={el.image_url} preview={el.preview_url} />
                    ))
                }
            </div>
            <button onClick={onClick} disabled={disabled} className='mt-lg sm:px-xl px-sm py-md w-fit bg-blue font-kanit md:text-sm text-vsm rounded-lg transition hover:bg-lightblue'>
                {disabled ? 'SAVING...' : 'SAVE PLAYLIST'}
            </button>
            { error && <p className='font-kanit md:text-sm text-vsm text-red mt-vsm'>{ error }</p> }
        </div>
    )
}

export default Recommendations