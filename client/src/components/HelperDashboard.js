import React, { useContext } from 'react';
import { Context } from '../Context';

import HelperVideo from './HelperVideo';
import CurrentRequests from './CurrentRequests';

const HelperDashboard = () => {
  const { callAccepted } = useContext(Context);

  return (
    <div className='center'>
      {!callAccepted && <CurrentRequests />}
      {callAccepted && <HelperVideo />}
    </div>
  );
};

export default HelperDashboard;
