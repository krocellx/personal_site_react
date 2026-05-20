import { render, screen } from '@testing-library/react';

import PerformanceTable from './PerformanceTables';

// Component tests render a component with known props, then assert what a user
// would see on the screen. Avoid checking implementation details like internal
// variable names or Bootstrap class names unless those are the actual behavior.
describe('PerformanceTable', () => {
  test('renders annual and monthly mean returns as percentages', () => {
    // render(...) mounts the component in a lightweight test DOM.
    render(
      <PerformanceTable
        performanceMetric={{
          annual_return_mean: 0.123,
          monthly_return_mean: 0.014,
        }}
      />
    );

    // screen queries the DOM in a user-oriented way. Here we look for visible
    // table labels and formatted values instead of inspecting component state.
    expect(screen.getByText('Mean Return (Annual)')).toBeInTheDocument();
    expect(screen.getByText('Mean Return (Monthly)')).toBeInTheDocument();

    // These values prove that PerformanceTable is using formatter.js correctly.
    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText('1%')).toBeInTheDocument();
  });
});
