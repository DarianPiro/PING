import React, { useContext } from 'react';
import './App.css';
import Nav from './components/Nav';
import Logo from './components/Logo';
import Login from './components/Login';
import Account from './components/Account';
import ClientDashboard from './components/ClientDashboard';
import HelperDashboard from './components/HelperDashboard';
import { Context } from './Context';

function App() {
  const { currentUser } = useContext(Context);

  return (
    <div className="App">
      <Logo />
      <Login />
      {currentUser.registered && <Nav />}
      {/* {currentUser.registered && <Account />} */}
      {currentUser.registered && currentUser.role === 'Helpee' && (
        <ClientDashboard />
      )}
      {currentUser.registered && currentUser.role === 'Helper' && (
        <HelperDashboard />
      )}
    </div>
  );
}

export default App;
