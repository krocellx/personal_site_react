import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

const Welcome = () => (
  <Jumbotron>
    <h1>Harvey Xie's personal Site</h1>
    <p>This is simple application using React and Python.</p>
    <h5>Current functionalities (via sidebar):</h5>
    <li>Stock Perfromance: W.I.P. performance analytics</li>
    <li>Image Search: search random picture and store in MangoDB</li>
    <Button
      variant="primary"
      href="https://github.com/krocellx/personal_site_react"
      target="_blank"
      style={{ marginTop: '6px' }}
    >
      GitHub Link
    </Button>
  </Jumbotron>
);

export default Welcome;
