import React from 'react';
import { Container, iframe } from 'react-bootstrap';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050/api';

const ReplicationFactorInvestingUsingCMAs = () => {
  // const iframe = document.getElementById('my_iframe').contentDocument;
  // const handleStockSearchSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // setLoading(true);
  //     const res = await axios.get(
  //       `${API_URL}/replication-factor-investing-using-cmas`
  //     );
  //     iframe.write(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
