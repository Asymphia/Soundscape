import { useAuthContext } from '../hooks/useAuthContext'
import { useState, useEffect } from 'react'

const SpotifyStats = () => {
    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)

            const response = await fetch('/api/spotify/getProfile', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }

            if (response.ok) {
                setIsLoading(false)
                setData(json)
                console.log(json)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            { error && <p>{ error }</p> }
        </div>
    )
}

export default SpotifyStats