import { useState, React } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import StockSearch from '../components/StockSearch';
import PortfolioDefinitionTable from '../components/PortfolioDefinitionTable';
import HistPriceLineChart from '../components/LineCharts';
import Spinner from '../components/Spinner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050/api';

const PortfolioConstruction = () => {
  const [ticker, setTicker] = useState('');
  const [benchmark, setBenchmark] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [returnData, setReturnData] = useState({ ticker: 'empty' });
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
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
    setTicker(ticker.toUpperCase());
  };
  return (
    <div>
      <Container className="mt-4">
        <h1 className="text-center">Portfolio Construction</h1>
        <PortfolioDefinitionTable />
      </Container>
      {/* {loading ? (
        <Spinner />
      ) : (
        <>
          <Container className="mt-4">
            <h1>Portfolio Construction</h1>
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
                    <PerformanceTabs data={returnData} />
                  </Col>
                </Row>
              </Container>
            ) : (
              <h5>TODO: Compare Stock with Benchmark</h5>
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />*/}
    </div>
  );
};
export default PortfolioConstruction;
