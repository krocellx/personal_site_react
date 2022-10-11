import React from 'react';
import { Button } from 'react-bootstrap';

const Home = () => (
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1>Harvey Xie's personal Site</h1>
      <p>
        Rotman MBA Candidate with passion in Portfolio Construction and Factor
        Investing
      </p>
      <h5>Current functionalities (via sidebar):</h5>
      <li>Equity Research and Security Selection Space</li>
      <li>Portfolio Construction Space</li>
      <li>Image Search: search random picture and store in MangoDB</li>
      <Button
        variant="primary"
        href="https://github.com/krocellx/personal_site_react"
        target="_blank"
        style={{ marginTop: '6px' }}
      >
        GitHub Link
      </Button>
    </div>
  </div>
);

export default Home;
