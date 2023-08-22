import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext'
import { SpotifyContextProvider } from './contexts/SpotifyContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
          <SpotifyContextProvider>
              <App />
          </SpotifyContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);
