import React, { useState } from 'react';
import {
  Offcanvas,
  NavDropdown,
  Navbar,
  Nav,
  Form,
  Container,
  Button,
  Card,
  Row,
  Col,
  Collapse,
  ListGroup,
} from 'react-bootstrap';
import styled from 'styled-components';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { EventKey } from '@restart/ui/types';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import '../css/styles.css';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Sidemenu = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Row>
        {/* <Col className="col-auto">
          <ListGroup horizontal={false} className="text-truncate">
            <ListGroup.Item action>{SidebarData[0].icon}</ListGroup.Item>
            <ListGroup.Item>{SidebarData[1].icon}</ListGroup.Item>
          </ListGroup>
        </Col> */}
        <Col className="col-auto">
          {/* <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            click
          </Button> */}
          <div id="responsive-side-menu">
            <Collapse in={open} dimension="width">
              {/* <div id="test"> */}
              <ListGroup
                horizontal={false}
                className="text-truncate"
                id="test"
                variant="flush"
              >
                {/* <NavIcon to="#"> */}
                <ListGroup.Item
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                  id="test"
                >
                  <FaIcons.FaBars />
                </ListGroup.Item>
                {/* </NavIcon> */}
                <ListGroup.Item action>
                  {SidebarData[0].icon} {SidebarData[0].title}
                </ListGroup.Item>
                <ListGroup.Item>
                  {SidebarData[1].icon}
                  {SidebarData[1].title}
                </ListGroup.Item>
              </ListGroup>
              {/* </div> */}
            </Collapse>
          </div>
        </Col>
        <Col>
          <Navbar collapseOnSelect expand={false} bg="dark" variant="dark">
            <Container fluid></Container>
          </Navbar>

          <Navbar>
            <Nav>
              {/* {SidebarData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })} */}
              <Nav.Item>{SidebarData[0].icon}</Nav.Item>
            </Nav>
          </Navbar>
        </Col>
        {/* <Col>
          {' '}
          <SidebarMenu>
            <SidebarMenu.Collapse>
              <SidebarMenu.Toggle />

              <SidebarMenu.Body>
                <SidebarMenu.Nav>
                  {SidebarData[1].icon}
                  {SidebarData[1].title}
                </SidebarMenu.Nav>
              </SidebarMenu.Body>
            </SidebarMenu.Collapse>
          </SidebarMenu>
        </Col> */}
      </Row>
    </>
  );
};

export default Sidemenu;
