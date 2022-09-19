import React from 'react';
import Welcome from '../components/Home';
import { Container } from 'react-bootstrap';

const Overview = () => {
  return (
    <Container className="mt-4">
      <Welcome />
    </Container>
  );
};

export default Overview;
