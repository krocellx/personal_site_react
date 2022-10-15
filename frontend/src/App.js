import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import Sidemenu from './components/Sidemenu';
import Header from './components/Header';

import ImageSearch from './pages/ImageSearch';
import PerformanceAnalysis from './pages/PerformanceAnalysis';
import PortfolioConstruction from './pages/PortfolioConstruction';
import ReplicationFactorInvestingUsingCMAs from './pages/ReplicationFactorInvestingUsingCMAs';
import ExperimentPage from './pages/Experiment';
import Home from './pages/HomePage';

function App() {
  return (
    <div>
      <Router>
        <Row className="g-0">
          <Col className="col-auto ">
            <Sidemenu />
          </Col>
          <Col>
            <Header />
            <Container fluid className="mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/image-search" element={<ImageSearch />} />
                <Route
                  path="/equity-research"
                  element={<PerformanceAnalysis />}
                />
                <Route
                  path="/portfolio-construction"
                  element={<PortfolioConstruction />}
                />
                <Route
                  path="/portfolio-construction/factor-investing-using-cmas"
                  element={<ReplicationFactorInvestingUsingCMAs />}
                />
                <Route path="/experiment" element={<ExperimentPage />} />
              </Routes>
            </Container>
          </Col>
        </Row>
      </Router>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
