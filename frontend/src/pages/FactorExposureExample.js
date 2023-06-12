import React, { useState } from 'react';
import { Col, Container, Row, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from '../components/Spinner';
import RollingExposureLineChart from '../components/FactorExposureRollingLineCharts';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050/api';

const FactorExposureExample = () => {
  const [exposure, setExposure] = useState({});
  const [rollingData, setRollingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState('');

  const TICKER_OPTIONS = [
    'AAPL',
    'GOOGL',
    'MSFT',
    'SPY',
    'XLB',
    'XLC',
    'XLE',
    'XLF',
    'XLI',
    'XLP',
    'XLRE',
    'XLU',
    'XLV',
    'XLY',
  ];

  const factorNameMapping = {
    R_IA: 'Investment (I/A)',
    R_ME: 'Size (ME)',
    R_MKT: 'Market (Rm-Rf)',
    R_ROE: 'Return on Equity (ROE)',
    const: 'Const',
  };
  const handleTickerSelect = (ticker) => {
    setSelectedTicker(ticker);
  };

  const getExampleExposure = async (ticker) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/factor_exposure?ticker=${selectedTicker}`
      );
      setExposure(res.data || {});
      // transform 'rolling' object into array of objects
      const transformedRollingData = Object.keys(res.data.rolling).map(
        (date) => {
          const roundedData = {};
          Object.keys(res.data.rolling[date]).forEach((key) => {
            roundedData[key] = parseFloat(
              res.data.rolling[date][key].toFixed(2)
            );
          });

          return {
            date: date,
            'I/A': roundedData['R_IA'],
            ME: roundedData['R_ME'],
            'Rm-Rf': roundedData['R_MKT'],
            ROE: roundedData['R_ROE'],
            Const: roundedData['const'],
          };
        }
      );
      const filteredRollingData = transformedRollingData.filter(
        (_, index, array) => {
          const lastIndex = array.length - 1;
          const stepsFromLastIndex = lastIndex - index;

          return stepsFromLastIndex % 30 === 0;
        }
      );
      setRollingData(filteredRollingData);
      setLoading(false);
      toast.success('Exposure loaded');
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  const renderTable = (data, columns) => (
    <Table striped bordered hover>
      <tbody>
        {columns.map((col, idx) => (
          <tr key={idx}>
            <th>{col}</th>
            <td>
              {typeof data[col] === 'number'
                ? Number.isInteger(data[col])
                  ? data[col]
                  : data[col].toFixed(2)
                : data[col]}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderParameterTable = (data) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Factor</th>
          <th>Loading</th>
          <th>Standard Error</th>
          <th>t-stat</th>
          <th>p-value</th>
          <th>95% Confidence Interval</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((factor, idx) => (
          <tr key={idx}>
            <td>{factorNameMapping[factor] || factor}</td>
            <td>{data[factor].coef.toFixed(2)}</td>
            <td>{data[factor].std_err.toFixed(6)}</td>
            <td>{data[factor].t_value.toFixed(2)}</td>
            <td>{data[factor].p_value.toFixed(6)}</td>
            <td>
              {data[factor].conf_int.map((val) => val.toFixed(2)).join(' ... ')}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Container className="mt-4">
          <h1 className="text-center">q-Factor Regression Analysis</h1>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Form>
                <Row>
                  <Col xs={9}>
                    <Form.Control
                      as="select"
                      value={selectedTicker}
                      onChange={(e) => handleTickerSelect(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Ticker
                      </option>
                      {TICKER_OPTIONS.map((ticker, idx) => (
                        <option key={idx} value={ticker}>
                          {ticker}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => getExampleExposure(selectedTicker)}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          {exposure.full_horizon && (
            <>
              <h4 className="text-center">Regression stats</h4>
              {renderTable(
                {
                  Ticker:
                    exposure.full_horizon.regression_stats.Tickers.join(', '),
                  'Time period':
                    exposure.full_horizon.regression_stats['Time period'].join(
                      ' - '
                    ),
                  'Number of dates':
                    exposure.full_horizon.regression_stats[
                      'Number of data points'
                    ],
                  'R^2': exposure.full_horizon.regression_stats['R-squared'],
                  'F-stat':
                    exposure.full_horizon.regression_stats['F-statistic'],
                  Autocorrelation:
                    exposure.full_horizon.regression_stats.Autocorrelation,
                  Heteroscedasticity:
                    exposure.full_horizon.regression_stats.Heteroscedasticity,
                },
                [
                  'Ticker',
                  'Time period',
                  'Number of dates',
                  'R^2',
                  'F-stat',
                  'Autocorrelation',
                  'Heteroscedasticity',
                ]
              )}
              <h4 className="text-center">Factor stats</h4>
              {renderParameterTable(
                exposure.full_horizon.regression_stats.Parameters,
                [
                  'Factor',
                  'Loading',
                  'Standard Error',
                  'T-stat',
                  'P-value',
                  '95% CI',
                ]
              )}
              <RollingExposureLineChart data={rollingData} />
            </>
          )}
        </Container>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default FactorExposureExample;
