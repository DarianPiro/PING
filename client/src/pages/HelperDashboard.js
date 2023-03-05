import React, { useContext } from 'react';
import { Context } from '../Context';
import HelperVideo from '../components/HelperVideo';
import CurrentRequests from '../components/CurrentRequests';
import Reviews from './Reviews';
import Account from './Account';

const HelperDashboard = () => {
  const { currentPage, call } = useContext(Context);

  return (
    <div className="center">
      {currentPage === 'Request' && !call.incoming && <CurrentRequests />}
      {currentPage === 'Request' && call.incoming && <HelperVideo />}
      {currentPage === 'Reviews' && <Reviews />}
      {currentPage === 'Account' && <Account />}
    </div>
  );
};

export default HelperDashboard;
