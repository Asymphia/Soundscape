const CreatePlaylistForm = ({ onClick, onChange, value, disabled, error }) => {
    return (
        <div className='bg-lightgray w-fit h-fit md:p-lg p-md rounded-sm text-center'>
            <h2 className='font-nunito font-bold text-white md:text-sm text-vsm mb-lg text-center'>
                Create a playlist based on your stats:
            </h2>
            <input
                className={`bg-lightgray ${error ? 'border-red' : 'border-blue'} border-[1px] border-solid rounded-sm w-[510px] px-lg py-md text-white transition focus:outline-none focus:border-lightblue font-kanit md:text-sm text-vsm`}
                type="number"
                placeholder="Number of tracks (1 - 20)"
                onChange={onChange}
                value={value}
            /> <br />
            { error && <p className='font-kanit md:text-sm text-vsm text-red mt-vsm'>{ error }</p> }
            <button onClick={onClick} disabled={disabled} className='mt-lg px-xl py-md w-fit bg-blue font-kanit md:text-sm text-vsm rounded-lg transition hover:bg-lightblue'>
                CREATE A PLAYLIST
            </button>
        </div>
    )
}

export default CreatePlaylistForm