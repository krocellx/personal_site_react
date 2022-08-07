import React from 'react';

const formatNumToPercentage = (value) => {
  return `${(value * 100).toFixed(0)}%`;
};

export default formatNumToPercentage;
