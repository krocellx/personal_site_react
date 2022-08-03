import { useState, useEffect, React } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import StockSearch from '../components/StockSearch';
import PerformanceTabs from '../components/PerformanceTabs';
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
  const [returnData, setReturnData] = useState({ ticker: 'empty' });
  const [loading, setLoading] = useState(false);

  const handleStockSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${API_URL}/stock-performance?ticker=${ticker}&benchmark=${benchmark}&startDate=${startDate}&endDate=${endDate}`
        // `${API_URL}/stock_price?ticker=${ticker}&startDate=${'2022-07-28'}&endDate=${'2022-07-29'}`
      );
      setReturnData(res.data);
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
          <h1>Performance Analysis</h1>
          <StockSearch
            ticker={ticker}
            setTicker={setTicker}
            benchmark={benchmark}
            setBenchmark={setBenchmark}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleSubmit={handleStockSearchSubmit}
          />

          <Container className="mt-4">
            {returnData.ticker !== 'empty' ? (
              <Container mb={2}>
                <Row mb={2}>
                  <Charts data={returnData.ticker} />
                </Row>
                <Row mb={2}>
                  <Col>
                    <PerformanceTabs data={returnData} />
                  </Col>
                </Row>
              </Container>
            ) : (
              <h3>Compare Stock with Benchmark</h3>
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};
export default PerformanceAnalysis;
