import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
// import { withRouter } from 'react-router';
import '../css/sidebar.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ImageSearch from '../pages/ImageSearch';
import PerformanceAnalysis from '../pages/PerformanceAnalysis';
import ExperimentPage from '../pages/Experiment';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import styled from 'styled-components';

const Sidebar = ({ title }) => {
  return (
    // <Navbar collapseOnSelect expand="sm" fixed="top">
    //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   <Navbar.Collapse id="responsive-navbar-nav">
    //     <Nav
    //       // className="col-md-12 d-none d-md-block bg-dark sidebar"

    //       className="sidebar flex-column"
    //       activeKey="/home"

    //       // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    //     >
    //       <div className="sidebar-sticky"></div>
    //       {SidebarData.map((item, index) => {
    //         return <SubMenu item={item} key={index} />;
    //       })}
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
    <></>
  );
};
// const Sidebar = withRouter(Side);
export default Sidebar;
