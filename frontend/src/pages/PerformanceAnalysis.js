import { useState, React } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import StockSearch from '../components/StockSearch';
import PerformanceTabs from '../components/PerformanceTabs';
import HistPriceLineChart from '../components/LineCharts';
import Spinner from '../components/Spinner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050/api';

const PerformanceAnalysis = () => {
  const [ticker, setTicker] = useState('');
  const [benchmark, setBenchmark] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [returnData, setReturnData] = useState({ ticker: 'empty' });
  const [fundamentalData, setfundamentalData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleStockSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/stock-performance?ticker=${ticker}&benchmark=${benchmark}&startDate=${startDate}&endDate=${endDate}`
      );
      setReturnData(res.data);
      toast.info(`Stock ${ticker} was found`);
      const res_fun = await axios.get(
        `${API_URL}/company-ratios?ticker=${ticker.toUpperCase()}`
      );
      setfundamentalData(res_fun.data);
    } catch (error) {
      setfundamentalData({});
      console.log(error);
    }
    setLoading(false);
    setTicker(ticker.toUpperCase());
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Container className="mt-4">
            <h1 className="text-center">Equity Research Space</h1>
            <StockSearch
              ticker={ticker}
              setTicker={setTicker}
              benchmark={benchmark}
              setBenchmark={setBenchmark}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleSubmit={handleStockSearchSubmit}
            />
            {returnData.ticker !== 'empty' ? (
              <Container mb={2}>
                <Row>
                  <HistPriceLineChart ticker={returnData.ticker} />
                </Row>
                <Row mb={2}>
                  <Col>
                    <PerformanceTabs
                      returnData={returnData}
                      fundamentalData={fundamentalData}
                    />
                  </Col>
                </Row>
              </Container>
            ) : (
              <h5> </h5>
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};
export default PerformanceAnalysis;
