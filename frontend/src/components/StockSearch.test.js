import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import StockSearch from './StockSearch';

// This test uses a tiny wrapper component because StockSearch is a controlled
// form: the input value comes from props, and each input calls a setter prop.
// The wrapper gives the test real React state, similar to the parent page.
describe('StockSearch', () => {
  test('updates fields and submits the form', () => {
    // handleSubmit receives a real form submit event. preventDefault keeps the
    // test DOM from behaving like a browser page reload.
    const handleSubmit = jest.fn((event) => event.preventDefault());

    function Harness() {
      const [ticker, setTicker] = useState('');
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');

      return (
        <StockSearch
          ticker={ticker}
          setTicker={setTicker}
          benchmark=""
          setBenchmark={jest.fn()}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleSubmit={handleSubmit}
        />
      );
    }

    render(<Harness />);

    // getByLabelText is usually the best form-query style. It finds the input
    // through the visible label the user reads on the page.
    userEvent.type(screen.getByLabelText('Ticker'), 'AAPL');
    userEvent.type(screen.getByLabelText('Start Date (Optional)'), '2024-01-01');
    userEvent.type(screen.getByLabelText('End Date (Optional)'), '2024-01-31');

    // Submit through the visible button, not by calling handleSubmit directly.
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // These assertions prove that typing flowed through React state and back
    // into the controlled inputs.
    expect(screen.getByLabelText('Ticker')).toHaveValue('AAPL');
    expect(screen.getByLabelText('Start Date (Optional)')).toHaveValue('2024-01-01');
    expect(screen.getByLabelText('End Date (Optional)')).toHaveValue('2024-01-31');

    // This proves that the form submit path was triggered.
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
