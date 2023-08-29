import { createContext, useReducer } from 'react'

export const SpotifyContext = createContext()

export const spotifyReducer = (state, action) => {
    switch (action.type){
        case 'SET_SPOTIFY_DATA':
            return { data: action.payload }
        default:
            return state
    }
}

export const SpotifyContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(spotifyReducer, {
        data: null
    })

    return (
        <SpotifyContext.Provider value={{ ...state, dispatch }}>
            { children }
        </SpotifyContext.Provider>
    )
}