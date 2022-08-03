import Table from 'react-bootstrap/Table';

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
          <td>
            {(performanceMetric.annual_return_mean * 100).toFixed(2) + '%'}
          </td>
        </tr>
        <tr>
          <td>Mean Return (Monthly)</td>
          <td>
            {(performanceMetric.monthly_return_mean * 100).toFixed(2) + '%'}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default PerformanceTable;
