import numpy as np
import pandas as pd
import pytest

from api.portfolio_construction_engine import engine as e


# Shared test inputs. Fixtures keep the tests concise and make it clear which
# setup data is reused across portfolio validation scenarios.
@pytest.fixture
def assets():
    return ['AAPL', 'GOOG', 'TSLA']


@pytest.fixture
def weights():
    return [0.4, 0.3, 0.3]


@pytest.fixture
def forecast_returns():
    # Forecast returns are already in wide format: one column per asset.
    return pd.DataFrame(
        {
            'AAPL': [0.01, -0.02, 0.01, 0.02],
            'GOOG': [0.01, 0.02, -0.01, -0.02],
            'TSLA': [-0.02, 0.01, 0.02, -0.01],
        }
    )


@pytest.fixture
def historical_prices():
    # Historical prices match the production contract used by Portfolio:
    # long-form rows with ticker, date, and value columns.
    return pd.DataFrame(
        [
            {'ticker': 'AAPL', 'date': '2024-01-01', 'value': 100.0},
            {'ticker': 'AAPL', 'date': '2024-01-02', 'value': 110.0},
            {'ticker': 'AAPL', 'date': '2024-01-03', 'value': 121.0},
            {'ticker': 'GOOG', 'date': '2024-01-01', 'value': 200.0},
            {'ticker': 'GOOG', 'date': '2024-01-02', 'value': 210.0},
            {'ticker': 'GOOG', 'date': '2024-01-03', 'value': 231.0},
            {'ticker': 'TSLA', 'date': '2024-01-01', 'value': 300.0},
            {'ticker': 'TSLA', 'date': '2024-01-02', 'value': 330.0},
            {'ticker': 'TSLA', 'date': '2024-01-03', 'value': 297.0},
        ]
    )


def test_portfolio_uses_forecast_returns(assets, weights, forecast_returns):
    # If forecast returns are provided, Portfolio should preserve that return
    # matrix and store the weights as a numpy array.
    portfolio = e.Portfolio(assets, weights, forecast_returns=forecast_returns)

    assert set(assets).issubset(portfolio.returns.columns)
    np.testing.assert_array_equal(portfolio.weights, np.array(weights))
    pd.testing.assert_frame_equal(portfolio.returns, forecast_returns)


def test_portfolio_calculates_returns_from_long_form_prices(
    assets, weights, historical_prices
):
    # This verifies the price-to-return transformation:
    # long-form prices -> date x ticker pivot -> percent-change returns.
    portfolio = e.Portfolio(assets, weights, historical_prices=historical_prices)

    expected_returns = pd.DataFrame(
        {
            'AAPL': [0.10, 0.10],
            'GOOG': [0.05, 0.10],
            'TSLA': [0.10, -0.10],
        },
        index=pd.to_datetime(['2024-01-02', '2024-01-03']),
    )
    expected_returns.columns.name = 'ticker'
    expected_returns.index.name = 'date'

    pd.testing.assert_frame_equal(
        portfolio.returns,
        expected_returns,
        check_exact=False,
        rtol=1e-12,
    )
    np.testing.assert_array_equal(portfolio.weights, np.array(weights))


def test_weights_must_sum_to_one(assets, forecast_returns):
    # Portfolio weights represent allocations, so they must add to 100%.
    with pytest.raises(ValueError, match='Weights must sum to 1'):
        e.Portfolio(assets, [0.4, 0.3, 0.4], forecast_returns=forecast_returns)


def test_weights_must_be_in_range(assets, forecast_returns):
    # Negative weights and weights above 1 are not supported by this class.
    with pytest.raises(ValueError, match='Weights must be in the range'):
        e.Portfolio(assets, [0.4, -0.3, 0.9], forecast_returns=forecast_returns)


def test_historical_prices_must_have_required_columns(assets, weights):
    # A clear validation error is better than a pandas KeyError later.
    malformed_prices = pd.DataFrame({'AAPL': [100.0, 101.0]})

    with pytest.raises(ValueError, match='Historical prices must include columns'):
        e.Portfolio(assets, weights, historical_prices=malformed_prices)


def test_historical_prices_must_include_all_assets(
    assets, weights, historical_prices
):
    # Every requested asset must exist in the supplied price history.
    missing_tsla = historical_prices[historical_prices['ticker'] != 'TSLA']

    with pytest.raises(ValueError, match='All assets must be present'):
        e.Portfolio(assets, weights, historical_prices=missing_tsla)


def test_forecast_returns_must_match_asset_count(forecast_returns):
    # The number of forecast-return columns must match the number of assets.
    with pytest.raises(ValueError, match='Assets and forecast returns'):
        e.Portfolio(['AAPL', 'GOOG'], [0.5, 0.5], forecast_returns=forecast_returns)
