import React from 'react';
import { Button } from 'react-bootstrap';

const Home = () => (
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1>Harvey Xie's Personal Site</h1>
      <p>
        Rotman MBA Candidate with a passion for Portfolio Construction and
        Factor Investing
      </p>
      <h5>Current functionalities (via sidebar):</h5>
      <li>Equity Research and Security Selection Space</li>
      <li>
        Replication of "Factor Investing Using Capital Market Assumptions"
      </li>
      <li>Search for images based on keywords and store them in MongoDB</li>
      <Button
        variant="primary"
        href="https://github.com/krocellx"
        target="_blank"
        style={{ marginTop: '40px' }}
      >
        GitHub
      </Button>{' '}
      <Button
        variant="primary"
        href="https://www.linkedin.com/in/harveyxie/"
        target="_blank"
        style={{ marginTop: '40px' }}
      >
        Linkedin
      </Button>
    </div>
  </div>
);

export default Home;
