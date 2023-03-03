import React, { useContext } from 'react';
import { Context } from '../Context';
import HelperVideo from '../components/HelperVideo';
import CurrentRequests from '../components/CurrentRequests';
import Reviews from '../components/Reviews';
import Account from '../components/Account';

const HelperDashboard = () => {
  const { callAccepted, currentPage } = useContext(Context);

  return (
    <div className="center">
      {currentPage === 'Request' && !callAccepted && <CurrentRequests />}
      {currentPage === 'Request' && callAccepted && <HelperVideo />}
      {currentPage === 'Reviews' && <Reviews />}
      {currentPage === 'Account' && <Account />}
    </div>
  );
};

export default HelperDashboard;
