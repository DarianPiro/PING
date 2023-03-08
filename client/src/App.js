import React, { useContext } from 'react';
import './App.css';
import Nav from './components/ui/Nav';
import Logo from './components/ui/Logo';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import HelperDashboard from './pages/HelperDashboard';
import { Context } from './Context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ffa600',
    },
    secondary: {
      main: '#ffa600',
    },
    background: {
      default: '#212933',
      paper: '#212933',
    },
    info: {
      main: '#ffa600',
    },
    error: {
      main: '#021e33',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
    },
  },
};

function App() {
  const { currentUser, call } = useContext(Context);

  const theme = createTheme(themeOptions);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Logo />
        <Login />
        {currentUser.registered && !call.accepted && <Nav />}
        {currentUser.registered && currentUser.role === 'Helpee' && (
          <ClientDashboard />
        )}
        {currentUser.registered && currentUser.role === 'Helper' && (
          <HelperDashboard />
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
