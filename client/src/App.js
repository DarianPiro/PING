import React, { useContext } from 'react';
import './App.css';
import Login from './components/Login';
import HelperVideo from './components/HelperVideo';
import ClientVideo from './components/ClientVideo';
import { Context } from './Context';

function App() {
  const { currentUser } = useContext(Context);

  return (
    <div className="App">
      <Login />
      {currentUser.registered && currentUser.role === 'Helpee' && <ClientVideo />}
      {currentUser.registered && currentUser.role === 'Helper' && <HelperVideo />}
    </div>
  );
}

export default App;
