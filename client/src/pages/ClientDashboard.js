import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import ClientVideo from '../components/ClientVideo';
import CreateRequest from '../components/CreateRequest';
import PastRequests from '../pages/PastRequests';
import Reviews from '../pages/Reviews';
import Account from '../pages/Account';
import RateHelper from '../pages/RateHelper';

const ClientDashboard = () => {
  const { request, currentPage } = useContext(Context);

  useEffect(() => {
    console.log(request);
  }, [request]);

  return (
    <div className="center">
      {currentPage === 'Request' && !request.sent && request.status === 'Completed' && <CreateRequest /> }
      {currentPage === 'Request' && request.sent && request.helper === '' && request.status === 'Pending' && <ClientVideo />}
      {currentPage === 'Request' && request.helper !== '' && request.status === 'Pending' && <RateHelper />}
      {currentPage === 'PastRequests' && <PastRequests />}
      {currentPage === 'Reviews' && <Reviews />}
      {currentPage === 'Account' && <Account />}
    </div>
  );
};

export default ClientDashboard;
