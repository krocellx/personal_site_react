import React, { useState } from 'react';
import { Nav, Collapse, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import '../css/styles.css';
import * as FaIcons from 'react-icons/fa';

const NavIcon = styled(Nav.Item)`
  color: #e1e9fc;
  margin-top: 5px;
  display: flex;
  margin-bottom: 3px;
  justify-content: space-between;
  align-items: center;
  padding: 13px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 2rem;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  height: 100vh;
  justify-content: center;
  width: 320px;
`;
const navbarStyle = {
  backgroundColor: '#15171c',
  display: 'flex',
  justifyCcontent: 'flex-start',
  alignItems: 'center',
  padding: '0rem',
};

const Sidemenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar id="responsive-side-menu" style={navbarStyle} sticky="top">
        <Collapse in={!open} dimension="width">
          <SidebarWrap>
            <SidebarNav className="text-truncate">
              <NavIcon
                // onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                <FaIcons.FaBars />
              </NavIcon>

              {SidebarData.map((item, index) => {
                return (
                  <SubMenu
                    item={item}
                    key={index}
                    sideMenuState={open}
                    setSideMenuState={setOpen}
                  />
                );
              })}
            </SidebarNav>
          </SidebarWrap>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Sidemenu;
