import React from 'react';
import iframe from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050/api';

const ReplicationFactorInvestingUsingCMAs = () => {
  return (
    <iframe
      title="test"
      id="my_iframe"
      class="responsive-iframe"
      src={`${API_URL}/replication-factor-investing-using-cmas`}
      width="100%"
      height="100%"
    ></iframe>
  );
};

export default ReplicationFactorInvestingUsingCMAs;
