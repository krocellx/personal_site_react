import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ImageSearch from './pages/ImageSearch';
import PerformanceAnalysis from './pages/PerformanceAnalysis';
import ExperimentPage from './pages/Experiment';
// import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Router>
        <Sidebar title="Personal Site" />
        <Container fluid className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/image-search" element={<ImageSearch />} />
            <Route
              path="/stock-performance"
              element={<PerformanceAnalysis />}
            />
            <Route path="/experiment" element={<ExperimentPage />} />
          </Routes>
        </Container>
      </Router>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
