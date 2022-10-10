import React from 'react';

const formatNumToPercentage = (value) => {
  return `${(value * 100).toFixed(0)}%`;
};

const formatNumToTwoDecimal = (value) => {
  return `${Math.round((value + Number.EPSILON) * 100) / 100}`;
};

export { formatNumToPercentage, formatNumToTwoDecimal };
