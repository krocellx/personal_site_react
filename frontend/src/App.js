import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import Charts from './components/Charts';
import StockSearch from './components/StockSearch';
import Sidebar from './components/Sidebar';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import { Container, Row, Col } from 'react-bootstrap';
import Overview from './pages/Overview';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';
const WEB_URL = process.env.REACT_APP_WEB_URL || 'http://localhost:3000/';

function App() {
  const [ticker, setTicker] = useState('');
  const [histPrice, setHistPrice] = useState({ symbol: 'empty' });
  const [loading, setLoading] = useState(false);

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

  const handleStockSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/stock_price?ticker=${ticker}`);
      console.log(res.data);
      setHistPrice(res.data);
      toast.info(`Stock ${ticker} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setTicker('');
  };

  return (
    <div>
      {/* <Header title="Personal Site" /> */}
      <Router>
        <Sidebar title="Personal Site" />
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/reports1" element={<ReportsOne />} />
          <Route path="/reports/reports2" element={<ReportsTwo />} />
          <Route path="/reports/reports3" elementt={<ReportsThree />} />
        </Routes>
      </Router>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <StockSearch
            ticker={ticker}
            setTicker={setTicker}
            handleSubmit={handleStockSearchSubmit}
          />

          <Container className="mt-4">
            {histPrice.symbol !== 'empty' ? (
              <Charts data={histPrice} />
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
