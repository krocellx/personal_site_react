import { Table, Form, InputGroup } from 'react-bootstrap';
import formatNumToPercentage from '../utility/formatter.js';
import { useState, React } from 'react';

function PortfolioDefinitionTable({ performanceMetric }) {
  const [portfolioFormDate, setPortfolioFormData] = useState([
    { id: 1, ticker: '', weight: '' },
    { id: 2, ticker: '', weight: '' },
  ]);
  const [symbolValue, setSymbolValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [rowNum, setRownum] = useState(2);

  // const rowAsset =
  return (
    <Form.Group className="mb-3">
      <Table borderless hover>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Allocation</th>
          </tr>
        </thead>
        <tbody>
          {portfolioFormDate.map((item) => {
            // console.log(item);
            return (
              <tr>
                <td>
                  <Form.Control
                    placeholder="Ticker Symbol"
                    value={item.ticker}
                    id={item.id}
                    onChange={(e) => setSymbolValue(e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup className="mb-2">
                    <Form.Control
                      value={item.weight}
                      id={item.id}
                      onChange={(e) => setWeightValue(e.target.value)}
                    />

                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Form.Group>
  );
}

export default PortfolioDefinitionTable;
