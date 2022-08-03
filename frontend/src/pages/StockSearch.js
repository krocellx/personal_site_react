import { useState, useEffect, React } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import StockSearch from '../components/StockSearch';

import Charts from '../components/Charts';
import Spinner from '../components/Spinner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050/api';

const PerformanceAnalysis = () => {
  const [ticker, setTicker] = useState('');
  const [benchmark, setBenchmark] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [histPrice, setHistPrice] = useState({ symbol: 'empty' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getSavedImages() {
      try {
        // const res = await axios.get(`${API_URL}/images`);
        // setImages(res.data || []);
        setLoading(false);
        toast.success('Page Loaded');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
    getSavedImages();
  }, []);

  const handleStockSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${API_URL}/stock_price?ticker=${ticker}&startDate=${startDate}&endDate=${endDate}`
      );
      // console.log(res.data);
      setHistPrice(res.data);
      toast.info(`Stock ${ticker} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setTicker(ticker.toUpperCase());
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Stock Hist Price</h1>
          <StockSearch
            ticker={ticker}
            setTicker={setTicker}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleSubmit={handleStockSearchSubmit}
          />

          <Container className="mt-4">
            {histPrice.symbol !== 'empty' ? (
              <Container mb={2}>
                <Row mb={2}>
                  <Charts data={histPrice} />
                </Row>
              </Container>
            ) : (
              <h3>.</h3>
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};
export default PerformanceAnalysis;
