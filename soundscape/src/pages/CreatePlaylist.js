import Footer from '../components/Footer'
import CreatePlaylistForm from '../components/CreatePlaylistForm'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import Recommendations from '../components/Recommendations'
import CreatedPlaylist from '../components/CreatedPlaylist'

const CreatePlaylist = () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [isCreated, setIsCreated] = useState(false)
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (value >= 1 && value <= 20) {
            setError(false)
            setIsLoading(true)

            try {
                const response = await fetch(`/api/spotify/getRecommendations?limit=${value}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (response.ok) {
                    const resData = await response.json()
                    setData(resData)
                    setError(false)
                } else {
                    setError('Server Error')
                }
            } catch (error) {
                setError('Server Error')
            }

            setIsLoading(false)
        } else {
            setError('The value must be between 1 and 20')
        }
    }

    const handleCreatePlaylist = async () => {
        const trackIds = data.map(item => item.id)
        setError(false)
        setIsLoading(true)

        try {
            const response = await fetch(`/api/spotify/createPlaylist?trackIds=${trackIds.join(',')}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            })

            if (response.ok) {
                const resData = await response.json()

                try{
                    const response = await fetch(`/api/spotify/changePlaylistCover/${resData.playlistId}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })

                    if(response.ok) {
                        setIsLoading(false)
                        setError(false)
                        setIsCreated(true)
                    } else {
                        setError('Server Error')
                        setIsLoading(false)
                    }
                } catch (err){
                    setError('Server Error')
                    setIsLoading(false)
                }
            } else {
                setError('Server Error')
                setIsLoading(false)
            }
        } catch (err) {
            setError('Server Error')
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className='bg-gray md:w-[calc(100%-200px)] w-[calc(100%-170px)] min-h-screen h-fit md:p-lg p-md md:ml-[200px] ml-[170px] flex justify-center items-center align-center content-center'>
                {!data && !isCreated && <CreatePlaylistForm onClick={handleClick} onChange={(e) => setValue(e.target.value)} value={value} disabled={isLoading} error={error} />}
                {data && !isCreated && <Recommendations data={data} onClick={handleCreatePlaylist} disabled={isLoading} error={error} />}
                {data && isCreated && <CreatedPlaylist />}
            </div>
            <Footer />
        </div>
    )
}

export default CreatePlaylist