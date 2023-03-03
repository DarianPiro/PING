import React, { useContext } from 'react';
import { Context } from '../Context';
import ClientVideo from './ClientVideo';

const ClientDashboard = () => {
  const { callAccepted } = useContext(Context);
  return (
    <div className='center'>
      {!callAccepted && <ClientVideo />}
    </div>
  )
}

export default ClientDashboard
