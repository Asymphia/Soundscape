import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthContextProvider } from './contexts/AuthContext'
import { SpotifyContextProvider } from './contexts/SpotifyContext'
import { PlayerContextProvider } from './contexts/PlayerContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <AuthContextProvider>
          <SpotifyContextProvider>
              <PlayerContextProvider>
                  <App />
              </PlayerContextProvider>
          </SpotifyContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
)
