import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useSpotifyContext } from './hooks/useSpotifyContext'

// pages and components
import SpotifyStats from './pages/SpotifyStats'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreatePlaylist from './pages/CreatePlaylist'
import Settings from './pages/Settings'

function App() {
    const { user } = useAuthContext()
    const { data } = useSpotifyContext()

    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    </Routes>
                    <Routes>
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
                    </Routes>
                    <Routes>
                        <Route path="/" element={user ? <SpotifyStats /> : <Navigate to="/login" />} />
                    </Routes>
                    <Routes>
                        <Route path="/create-playlist" element={user ? (data ? <CreatePlaylist /> : <Navigate to="/" />) : (<Navigate to="/login" />)} />
                    </Routes>
                    <Routes>
                        <Route path="/settings" element={user ? (data ? <Settings /> : <Navigate to="/" />) : (<Navigate to="/login" />)} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
      );
}

export default App;
