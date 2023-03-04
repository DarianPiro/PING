import React, { useContext } from 'react';
import { Context } from '../Context';
import HelperVideo from '../components/HelperVideo';
import CurrentRequests from '../components/CurrentRequests';
import Reviews from '../pages/Reviews';
import Account from '../pages/Account';

const HelperDashboard = () => {
  const { currentPage, call } = useContext(Context);

  return (
    <div className="center">
      {currentPage === 'Request' && call.isReceivingCall !== false && <CurrentRequests />}
      {currentPage === 'Request' && call.isReceivingCall === false && <HelperVideo />}
      {currentPage === 'Reviews' && <Reviews />}
      {currentPage === 'Account' && <Account />}
    </div>
  );
};

export default HelperDashboard;
