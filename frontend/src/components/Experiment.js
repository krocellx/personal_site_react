import '../css/styles.css';
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TestChart from './TestChart';

function Experiment({ data }) {
  useEffect(() => {
    let timeoutId;
    async function getLatestPrice() {
      // const data = await getMinPrice();
      // const price = data.price;
      '';
      timeoutId = setTimeout(getLatestPrice, 5000);
    }
    timeoutId = setTimeout(getLatestPrice, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  });
  return (
    <Container fluid>
      {' '}
      <Row xl={6} md={4} xs={2} style={{ height: '85vh' }}>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
        <Col>
          <TestChart data={data.historical} />
        </Col>
      </Row>
    </Container>
  );
}
export default Experiment;
