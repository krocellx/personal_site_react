import {
  formatNumToPercentage,
  formatNumToTwoDecimal,
} from './formatter';

// Unit tests are the simplest React-project tests because they do not render
// components. They call a plain JavaScript function and check the returned value.
describe('formatter utilities', () => {
  test('formats decimal values as whole percentages', () => {
    // The app stores returns as decimals, so 0.1234 should display as 12%.
    expect(formatNumToPercentage(0.1234)).toBe('12%');
    expect(formatNumToPercentage(1)).toBe('100%');

    // This also documents how negative values are rounded for display.
    expect(formatNumToPercentage(-0.055)).toBe('-6%');
  });

  test('formats numbers to two decimal places when needed', () => {
    // This function returns strings because React renders the result directly.
    expect(formatNumToTwoDecimal(10)).toBe('10');
    expect(formatNumToTwoDecimal(10.126)).toBe('10.13');
    expect(formatNumToTwoDecimal(10.124)).toBe('10.12');
  });
});
