import React from 'react';
import { Navbar } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: '#15171c',
  height: '70px',
  display: 'flex',
  justifyCcontent: 'flex-start',
  alignItems: 'center',
  paddingLeft: '0rem',
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="dark" sticky="top">
      <Logo alt={title} style={{ maxWidth: '12rem', maxHeight: '2rem' }} />
    </Navbar>
  );
};

export default Header;
