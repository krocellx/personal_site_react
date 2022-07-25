import React from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const Search = ({ ticker, setTicker, handleSubmit, benchmark }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formPlaintextTicker"
            >
              <Form.Label column sm="3">
                Ticker
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  placeholder="Search Ticker..."
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formPlaintextBenchmark"
            >
              <Form.Label column sm="3">
                Benchmark
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  value={benchmark}
                  placeholder="(Optional)"
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formPlaintextStartDate"
            >
              <Form.Label column sm="3">
                Start Date
              </Form.Label>
              <Col xs={9}>
                <Form.Control type="date"></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formPlaintextEndDate"
            >
              <Form.Label column sm="3">
                End Date
              </Form.Label>
              <Col xs={9}>
                <Form.Control type="date"></Form.Control>
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
