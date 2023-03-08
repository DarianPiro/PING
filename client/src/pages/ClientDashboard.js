import React, { useContext } from 'react';
import { Context } from '../Context';
import ClientVideo from '../components/ClientVideo';
import ClientVideoAR from '../components/ClientVideoAR';
import CreateRequest from '../components/CreateRequest';
import PastRequests from '../pages/PastRequests';
import Account from '../pages/Account';
import RateHelper from '../pages/RateHelper';

const ClientDashboard = () => {
  const { request, currentPage } = useContext(Context);

  return (
    <div>
      {currentPage === 'Request' && request.status !== 'Pending' && <CreateRequest /> }
      {currentPage === 'Request' && request.helper === '' && request.status === 'Pending' && <ClientVideo />}
      {currentPage === 'Request' && request.helper !== '' && request.status === 'Pending' && <RateHelper />}
      {currentPage === 'PastRequests' && <PastRequests />}
      {currentPage === 'Account' && <Account />}
    </div>
  );
};

export default ClientDashboard;
