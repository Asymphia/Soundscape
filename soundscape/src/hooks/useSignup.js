import { useState } from 'react'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [spotifyAuthorizeURL, setSpotifyAuthorizeURL] = useState('')

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            const { userId } = json;

            const res = await fetch('/api/user/auth', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userId})
            })

            const jsonRes = await res.json()

            if(!res.ok){
                setIsLoading(false)
                setError(jsonRes.error)
            }

            if(res.ok){
                const { authorizeURL } = jsonRes
                setSpotifyAuthorizeURL(authorizeURL)

                setIsLoading(false)

                // Redirect the user to the Spotify authorization page
                window.location.href = authorizeURL
            }
        }
    }

    return { signup, isLoading, error }
}