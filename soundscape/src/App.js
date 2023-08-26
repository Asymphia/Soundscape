import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useSpotifyContext } from './hooks/useSpotifyContext'

// pages and components
import SpotifyStats from './pages/SpotifyStats'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreatePlaylist from './pages/CreatePlaylist'
import Settings from './pages/Settings'
import Menu from './components/Menu'
import NotFound from './pages/NotFound'
import Error from './pages/Error'

function App() {
    const { user } = useAuthContext()
    const { data } = useSpotifyContext()

    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    {/* Renderuj Menu tylko na trasach, gdzie go potrzebujesz */}
                    {user && window.location.pathname !== '/404' && <Menu />}

                    <Routes>
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
                        <Route path="/" element={user ? <SpotifyStats /> : <Navigate to="/login" />} />
                        <Route path="/create-playlist" element={user ? (data ? <CreatePlaylist /> : <Navigate to="/" />) : (<Navigate to="/login" />)} />
                        <Route path="/settings" element={user ? (data ? <Settings /> : <Navigate to="/" />) : (<Navigate to="/login" />)} />
                        <Route path="/error" element={!user ? <Error /> : <Navigate to="/signup" />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
      );
}

export default App;
