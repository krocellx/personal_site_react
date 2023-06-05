import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050/api';

const FactorExposureExample = () => {
  const [exposure, setExposure] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getExampleExposure() {
      try {
        const res = await axios.get(`${API_URL}/factor_exposure`);
        setExposure(res.data || {});
        setLoading(false);
        toast.success('Exposure loaded');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    getExampleExposure();
  }, []);

  const renderTable = (data, columns) => (
    <Table striped bordered hover>
      <tbody>
        {columns.map((col, idx) => (
          <tr key={idx}>
            <th>{col}</th>
            <td>
              {typeof data[col] === 'number'
                ? data[col].toFixed(2)
                : JSON.stringify(data[col])}
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
            <td>{factor}</td>
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
        <div>Loading...</div>
      ) : (
        <Container className="mt-4">
          <h1 className="text-center">The q-Factor Exposure Example</h1>
          <h4 className="text-center">Regression stats</h4>
          {renderTable(
            {
              Ticker: exposure.full_horizon.regression_stats.Tickers.join(', '),
              'Time period':
                exposure.full_horizon.regression_stats['Time period'].join(
                  ' - '
                ),
              'Number of dates':
                exposure.full_horizon.regression_stats['Number of data points'],
              'R^2': exposure.full_horizon.regression_stats['R-squared'],
              'F-stat': exposure.full_horizon.regression_stats['F-statistic'],
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
        </Container>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default FactorExposureExample;
