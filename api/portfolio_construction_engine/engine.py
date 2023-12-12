import pandas as pd
import numpy as np
from abc import ABC, abstractmethod
import statsmodels.api as sm
from collections import defaultdict


# import statsmodels.formula.api as smf
# from sklearn.linear_model import LinearRegression


# Portfolio Definitions
class Portfolio:
    def __init__(self, assets, weights, historical_prices=None, forecast_returns=None):
        assert len(assets) == len(weights), "Assets and weights lists must have the same length"
        assert np.isclose(sum(weights), 1), "Weights must sum to 1"
        assert all(0 <= weight <= 1 for weight in weights), "Weights must be in the range [0, 1]"

        self.assets = assets
        self.weights = np.array(weights)

        if historical_prices is not None:
            assert set(assets).issubset(set(
                historical_prices['ticker'].unique())), "All assets must be present in the historical prices DataFrame"
            self.returns = self.calculate_returns_from_prices(historical_prices)

        if forecast_returns is not None:
            assert len(assets) == forecast_returns.shape[
                1], "Assets and forecast returns lists must have the same length"
            self.returns = self.validate_returns(forecast_returns)

    @staticmethod
    def validate_returns(returns_df):
        assert returns_df.shape[0] > 1, "Returns DataFrame must have more than one row"
        return returns_df

    def calculate_returns_from_prices(self, prices_df):
        # Pivot the DataFrame to have dates as rows and assets as columns
        prices_df['date'] = pd.to_datetime(prices_df['date'])
        pivoted_prices = prices_df.pivot(index='date', columns='ticker', values='value')

        # Ensure the pivoted DataFrame has the correct columns
        assert set(self.assets).issubset(
            set(pivoted_prices.columns)), "All assets must be present in the pivoted prices DataFrame"

        # Calculate returns
        returns = pivoted_prices.pct_change().dropna()
        return returns


# Factor Definitions
class Factor:
    def __init__(self, filepath, convert_to_fraction=True):
        self.factor_data = pd.read_csv(filepath)
        self.parse_dates()
        if convert_to_fraction:
            self.convert_to_fraction()

    def parse_dates(self):
        self.factor_data['DATE'] = pd.to_datetime(self.factor_data['DATE'])

    def convert_to_fraction(self):
        # Convert factor data from percentage to fraction
        for column in ['R_F', 'R_MKT', 'R_ME', 'R_IA', 'R_ROE', 'R_EG']:
            self.factor_data[column] = self.factor_data[column] / 100

    def add_factor(self, factor):
        pass

    def remove_factor(self, factor):
        pass

    def calculate_exposures(self, portfolio):
        # Merge the portfolio returns and factor data on the date
        data = portfolio.returns.merge(self.factor_data, left_index=True, right_on='DATE')

        # Calculate portfolio return
        portfolio_return = (portfolio.weights * data[portfolio.assets]).sum(axis=1)

        # Calculate excess returns
        data['excess_returns'] = portfolio_return - data['R_F']

        # Select the factors
        factors = data[['R_MKT', 'R_ME', 'R_IA', 'R_ROE']]

        # Add constant to the factors for the intercept in the regression model
        factors = sm.add_constant(factors)

        result = self.cal_exposure(data, factors, ls_assets=portfolio.assets)

        return result

    def cal_custom_exposure(self, portfolio, factor_list, cal_excess_return=True):

        # Merge the portfolio returns and factor data on the date
        pf_name = portfolio.returns.columns[0]
        data = portfolio.returns.merge(self.factor_data, left_index=True, right_on='DATE')

        if cal_excess_return:
            # Calculate excess returns
            data['excess_returns'] = data[pf_name] - data['R_F']
        else:
            data['excess_returns'] = data[pf_name]

        # Select the factors
        factors = data[factor_list]

        result = self.cal_exposure(data, factors, ls_assets=portfolio.assets)

        return result

    @staticmethod
    def cal_exposure(portfolio: pd.DataFrame, factors: pd.DataFrame, ls_assets: list):
        # Add constant to the factors for the intercept in the regression model
        factors = sm.add_constant(factors)

        # Fit the linear regression using statsmodels
        model = sm.OLS(portfolio['excess_returns'], factors)
        results = model.fit()

        # Create a dictionary to store parameter statistics
        param_stats = {}
        for factor in factors.columns:
            param_stats[factor] = {
                'coef': results.params[factor],
                'std_err': results.bse[factor],
                't_value': results.tvalues[factor],
                'p_value': results.pvalues[factor],
                'conf_int': results.conf_int().loc[factor].values.tolist()
            }

        # Store the desired statistics in a dictionary
        regression_stats = {
            'R-squared': results.rsquared,
            'F-statistic': results.fvalue,
            'Autocorrelation': sm.stats.diagnostic.acorr_breusch_godfrey(results)[3],
            'Heteroscedasticity': sm.stats.diagnostic.het_breuschpagan(results.resid, results.model.exog)[3],
            'Parameters': param_stats,
            'Time period': [str(portfolio.DATE.min().date()), str(portfolio.DATE.max().date())],  # Time period
            'Tickers': ls_assets,  # List of tickers in the portfolio
            'Number of data points': len(portfolio)  # Number of data points
        }

        # Dictionary to store factor exposures from each window
        rolling_factor_exposures = {}

        # Window size (adjust based on frequency of data)
        window_size = 90

        # Perform rolling regression
        for i in range(window_size, len(portfolio)):
            # Select the data for the current window
            window_data = portfolio.iloc[i - window_size:i]
            window_factors = factors.iloc[i - window_size:i]

            # Fit the linear regression using statsmodels
            model = sm.OLS(window_data['excess_returns'], window_factors)
            results = model.fit()

            # Store the factor exposures
            rolling_factor_exposures[window_data.DATE.iat[-1].strftime('%Y-%m-%d')] = {
                factor: results.params[factor] for factor in factors.columns
            }

        return {
            'full_horizon': {
                'regression_stats': regression_stats
            },
            'rolling': rolling_factor_exposures
        }


# Abstract Optimization Class
class AbstractOptimization(ABC):
    @abstractmethod
    def optimize(self):
        pass


# Different optimization methods, inheriting from the abstract class
class MeanVarianceOptimization(AbstractOptimization):
    def optimize(self):
        pass


class RiskParityOptimization(AbstractOptimization):
    def optimize(self):
        pass


# Risk Model
class RiskModel:
    def __init__(self):
        pass

    def calculate_volatility(self):
        pass

    def calculate_correlation(self):
        pass


# Backtesting
class Backtest:
    def __init__(self):
        pass

    def run_backtest(self):
        pass

    def evaluate_performance(self):
        pass


# Performance Attribution
class PerformanceAttribution:
    def __init__(self):
        pass

    def calculate_attribution(self):
        pass


# Reporting
class Reporting:
    def __init__(self):
        pass

    def generate_report(self):
        pass


# Forecasting
class Forecasting:
    def __init__(self):
        pass

    def forecast_returns(self):
        pass


# Validation
class Validation:
    def __init__(self):
        pass

    def out_of_sample_testing(self):
        pass

    def sensitivity_analysis(self):
        pass


if __name__ == '__main__':
    import sys
    import os

    fpath = os.path.dirname(os.path.dirname(__file__))
    sys.path.append(fpath)
    from mongo_client import mongo_client

    sample_data_dir = os.path.join(fpath, 'portfolio_construction_engine', 'temp_data')
    factor_data_model = Factor(os.path.join(sample_data_dir, 'q5_factors_daily_2022.csv'))
    equity_price_collection = mongo_client.equity.price
    equity_price_get = equity_price_collection.find({'ticker': "SPY"})
    ls_equity_price_get = list(equity_price_get)
    df_eq_price = pd.DataFrame(ls_equity_price_get)
    df_eq_price.rename(columns={'Date': 'date', 'Close': 'value'}, inplace=True)
    df_eq_price = df_eq_price[['ticker', 'date', 'value']]
    df_eq_price['date'] = pd.to_datetime(df_eq_price['date'], utc=True).dt.tz_localize(None).dt.normalize()
    assets = ["SPY"]
    weights = [1]
    PORTFOLIO = Portfolio(assets, weights, historical_prices=df_eq_price)
    result = factor_data_model.calculate_exposures(PORTFOLIO)
    print('1')
