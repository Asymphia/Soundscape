import { SpotifyContext } from "../contexts/SpotifyContext"
import { useContext } from 'react'

export const useSpotifyContext = () => {
    const context = useContext(SpotifyContext)

    if(!context){
        throw Error('useSpotifyContext must be used inside SpotifyContextProvider')
    }

    return context
}