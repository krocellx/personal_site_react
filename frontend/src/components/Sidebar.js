import React, { useState } from 'react';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { ReactComponent as Logo } from '../images/logo.svg';
import { IconContext } from 'react-icons/lib';

const NavIcon = styled(Link)`
  margin-left: 20px;
  // font-size: 1rem;
  height: 80px;
  display: flex;
  // padding:20px
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: ${({ sidebar }) => (sidebar ? '250px' : '55px')};
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 70px;
  left: 0;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const navbarStyle = {
  backgroundColor: '#15171c',
  height: '70px',
  display: 'flex',
  justifyCcontent: 'flex-start',
  alignItems: 'center',
  paddingLeft: '0rem',
};

const Sidebar = ({ title }) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Navbar style={navbarStyle} variant="light" fixed="top">
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <Logo
            alt={title}
            style={{
              maxWidth: '12rem',
              maxHeight: '2.5rem',
              marginLeft: '10.5rem',
              paddingUp: '0.5rem',
            }}
          />
        </Navbar>
        <SidebarNav
          sidebar={sidebar}
          // onClick={showSidebar}
          className="text-truncate"
        >
          <SidebarWrap>
            {/* <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon> */}
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
