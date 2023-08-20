import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useEffect } from 'react';

// pages and components
import SpotifyStats from './pages/SpotifyStats'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
    const { user } = useAuthContext()

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
                </div>
            </BrowserRouter>
        </div>
      );
}

export default App;
