import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ImageSearch from './pages/ImageSearch';
import StockSearchPage from './pages/StockSearch';
// import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';

const WEB_URL = process.env.REACT_APP_WEB_URL || 'http://localhost:3000/';

function App() {
  setInterval(() => {
    axios.get(`${WEB_URL}`);
  }, 25 * 60 * 1000);

  // useEffect(() => {
  //   async function getSavedImages() {
  //     try {
  //       const res = await axios.get(`${API_URL}/images`);
  //       setImages(res.data || []);
  //       setLoading(false);
  //       toast.success('Saved images downloaded');
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message);
  //     }
  //   }
  //   getSavedImages();
  // }, []);

  return (
    <div>
      {/* <Header title="Personal Site" /> */}
      <Router>
        <Sidebar title="Personal Site" />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/image-search" element={<ImageSearch />} />
            <Route path="/stock-search" element={<StockSearchPage />} />
          </Routes>
        </Container>
      </Router>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
