import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

const Welcome = () => (
  <Jumbotron>
    <h1>Harvey Xie's personal Site</h1>
    <p>This is simple application using React and Python.</p>
    <p>
      <Button
        variant="primary"
        href="https://github.com/krocellx/personal_site_react"
        target="_blank"
      >
        GitHub
      </Button>
    </p>
  </Jumbotron>
);

export default Welcome;
