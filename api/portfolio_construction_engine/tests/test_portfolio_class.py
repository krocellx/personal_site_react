import unittest
from api.portfolio_construction_engine import engine as e
import pandas as pd
import numpy as np


class TestPortfolio(unittest.TestCase):
    def setUp(self):
        self.assets = ['AAPL', 'GOOG', 'TSLA']
        self.weights = [0.4, 0.3, 0.3]
        self.historical_prices = pd.DataFrame({
            'AAPL': [150, 155, 152, 151, 152],
            'GOOG': [2800, 2820, 2830, 2840, 2850],
            'TSLA': [600, 620, 610, 615, 620],
        })
        self.forecast_returns = pd.DataFrame({
            'AAPL': [0.01, -0.02, 0.01, 0.02],
            'GOOG': [0.01, 0.02, -0.01, -0.02],
            'TSLA': [-0.02, 0.01, 0.02, -0.01],
        })

    def test_portfolio_with_forecast_returns(self):
        portfolio = e.Portfolio(self.assets, self.weights, forecast_returns=self.forecast_returns)
        self.assertTrue(set(self.assets).issubset(portfolio.returns.columns))
        self.assertTrue(np.array_equal(portfolio.weights, np.array(self.weights)))

    def test_portfolio_with_historical_prices(self):
        portfolio = e.Portfolio(self.assets, self.weights, historical_prices=self.historical_prices)
        self.assertTrue(set(self.assets).issubset(portfolio.returns.columns))
        self.assertTrue(np.array_equal(portfolio.weights, np.array(self.weights)))

    def test_weights_sum_to_one(self):
        with self.assertRaises(AssertionError):
            weights_dont_sum_to_one = [0.4, 0.3, 0.4]
            e.Portfolio(self.assets, weights_dont_sum_to_one, forecast_returns=self.forecast_returns)

    def test_weights_range(self):
        with self.assertRaises(AssertionError):
            weights_out_of_range = [0.4, -0.3, 0.9]
            e.Portfolio(self.assets, weights_out_of_range, forecast_returns=self.forecast_returns)

if __name__ == '__main__':
    unittest.main()
