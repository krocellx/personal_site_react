import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: '#eeeeee',
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <div>
          <Logo alt={title} style={{ maxWidth: '12rem', maxHeight: '2rem' }} />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
