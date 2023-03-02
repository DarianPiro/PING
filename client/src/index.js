import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ContextProvider } from './Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-j52czrd4pzfgrhio.eu.auth0.com"
    clientId="2SWHdetvHjnsBaKTXQfxzeZv4zgcmXCD"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ContextProvider>
      <App />
    </ContextProvider>
  </Auth0Provider>
);
