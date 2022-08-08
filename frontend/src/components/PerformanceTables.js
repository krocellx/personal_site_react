import Table from 'react-bootstrap/Table';
import formatNumToPercentage from '../utility/formatter.js';

function PerformanceTable({ performanceMetric }) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Measure</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mean Return (Annual)</td>
          <td>{formatNumToPercentage(performanceMetric.annual_return_mean)}</td>
        </tr>
        <tr>
          <td>Mean Return (Monthly)</td>
          <td>
            {formatNumToPercentage(performanceMetric.monthly_return_mean)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default PerformanceTable;
