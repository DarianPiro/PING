import React, { useContext } from 'react';
import { Context } from '../Context';
import ClientVideo from '../components/ClientVideo';
import CreateRequest from '../components/CreateRequest';
import PastRequests from '../components/PastRequests';
import Reviews from '../components/Reviews';
import Account from '../components/Account';



const ClientDashboard = () => {
  const { request, currentPage } = useContext(Context);

  return (
    <div className="center">
      {currentPage === 'Request' && !request.sent && <CreateRequest />}
      {currentPage === 'Request' && request.sent && <ClientVideo />}
      {currentPage === 'PastRequests' && <PastRequests />}
      {currentPage === 'Reviews' && <Reviews />}
      {currentPage === 'Account' && <Account />}
    </div>
  );
};

export default ClientDashboard;
