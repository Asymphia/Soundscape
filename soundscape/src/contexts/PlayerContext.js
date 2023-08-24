import { createContext, useReducer, useEffect } from 'react'

export const PlayerContext = createContext()

export const playerReducer = (state, action) => {
    switch (action.type){
        case 'SET_CURRENTLY_PLAYING_SONG':
            return { song: action.payload }
        default:
            return state
    }
}

export const PlayerContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(playerReducer, {
        song: null
    })

    useEffect(() => {
        console.log('player', state)
    }, [state])

    return (
        <PlayerContext.Provider value={{ ...state, dispatch }}>
            { children }
        </PlayerContext.Provider>
    )
}