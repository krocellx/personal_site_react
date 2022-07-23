import { useState, useEffect, React } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Welcome from '../components/Welcome';
import StockSearch from '../components/StockSearch';
import Charts from '../components/Charts';
import Spinner from '../components/Spinner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const ImageSearch = () => {
  const [ticker, setTicker] = useState('');
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
};
export default ImageSearch;
