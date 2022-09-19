import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Sidebar2 from './components/Sidebar02';
import Sidemenu from './components/Sidemenu';
import ImageSearch from './pages/ImageSearch';
import PerformanceAnalysis from './pages/PerformanceAnalysis';
import ExperimentPage from './pages/Experiment';
// import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import { Container, Col, Row, Navbar } from 'react-bootstrap';
import './css/sidebar.css';
import Home from './pages/Home';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { ReactComponent as Logo } from './images/logo.svg';

const navbarStyle = {
  backgroundColor: '#15171c',
};
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
function App() {
  return (
    <div>
      <Sidemenu />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
