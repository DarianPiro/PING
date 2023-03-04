import React, { useContext } from 'react';
import './App.css';
import Nav from './components/ui/Nav';
import Logo from './components/ui/Logo';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import HelperDashboard from './pages/HelperDashboard';
import { Context } from './Context';
import AR from './pages/AR';

function App() {
  const { currentUser } = useContext(Context);

  return (
    <div className="App">
      <Logo />
      <Login />
      {currentUser.registered && <Nav />}
      {/* {currentUser.registered && currentUser.role === 'Helpee' && (
        <ClientDashboard />
      )}
      {currentUser.registered && currentUser.role === 'Helper' && (
        <HelperDashboard />
      )} */}
      <AR />
    </div>
  );
}

export default App;
