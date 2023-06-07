from multiprocessing import AuthenticationError
from multiprocessing.sharedctypes import Value
import os
import csv

import requests  # noqa: E402
from dotenv import load_dotenv  # noqa: E402
from flask import Flask, request, jsonify, make_response  # noqa: E402
from datetime import datetime  # noqa: E402
import utility as u  # noqa: E402
import pandas as pd

load_dotenv(dotenv_path="./.env.local")

FMP_ROOT_URL = os.environ.get("FMP_ROOT_URL", "https://financialmodelingprep.com/api/")
FMP_KEY = os.environ.get("FMP_KEY", "")


def get_treasury_rate(start_date, end_date=None):
    """get 10 year treasury as risk free rate"""
    if not (end_date):
        end_date = start_date

    url = FMP_ROOT_URL + "v4/treasury"
    params = {"apikey": FMP_KEY, "from": start_date, "to": end_date}
    response = requests.get(url=url, params=params)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        data = response.json()["error"]
        raise ValueError(data)


def get_stock_price(ticker, start_date=None, end_date=None, to_csv=False):
    url = FMP_ROOT_URL + "v3/historical-price-full/" + ticker.upper()
    params = {"apikey": FMP_KEY}
    error_msg = ""

    if start_date:
        params["from"] = start_date

    if start_date:
        params["to"] = end_date

    response = requests.get(url=url, params=params)

    if response.status_code == 200:
        data = response.json()
        if not (data):
            raise ValueError("No result found for ticker " + str(ticker) + error_msg)

        # sort data
        hist_price = data["historical"]
        sorted_hist_price = sorted(
            hist_price, key=lambda t: datetime.strptime(t["date"], "%Y-%m-%d")
        )
        data["historical"] = sorted_hist_price
        if to_csv:
            csv_file = f'{ticker}_historical_price.csv'
            csv_headers = ['symbol', 'date', 'open', 'high', 'low', 'close', 'adjClose', 'volume', 'unadjustedVolume',
                           'vwap', 'changeOverTime', 'changePercent', 'label', 'change']
            with open(csv_file, mode='w', newline='') as file:
                writer = csv.DictWriter(file, fieldnames=csv_headers)
                writer.writeheader()

                symbol = data['symbol']
                historical_data = data['historical']

                for item in historical_data:
                    item['symbol'] = symbol
                    writer.writerow(item)

        return data
    else:
        data = response.json()["error"]
        raise ValueError(data)


def get_live_quote(ls_tickers: list, short: bool = True) -> dict:
    """get live quote for list of"""

    quote_type = "quote-short" if short else "quote"
    error_msg = ""
    tickers = ",".join(ls_tickers).upper()
    url = FMP_ROOT_URL + f"v3/{quote_type}/{tickers}"
    params = {"apikey": FMP_KEY}

    current_time = datetime.now().strftime("%Y-%m-%d, %H:%M:%S")
    response = requests.get(url=url, params=params)
    print(datetime.now())
    if response.status_code == 200:
        data = response.json()
        if not (data):
            raise ValueError("No result found for tickers " + str(tickers) + error_msg)
        # add time stemp in the list
        data = {"time": current_time, "quotes": data}
        return data
    elif response.status_code == 403:
        raise AuthenticationError("Incorrect Key")
    else:
        data = response.json()["error"]
        raise ValueError(data)


def get_live_quote(ls_tickers: list, short: bool = True) -> dict:
    """get live quote for list of"""

    quote_type = "quote-short" if short else "quote"
    error_msg = ""
    tickers = ",".join(ls_tickers).upper()
    url = FMP_ROOT_URL + f"v3/{quote_type}/{tickers}"
    params = {"apikey": FMP_KEY}

    current_time = datetime.now().strftime("%Y-%m-%d, %H:%M:%S")
    response = requests.get(url=url, params=params)
    print(datetime.now())
    if response.status_code == 200:
        data = response.json()
        if not (data):
            raise ValueError("No result found for tickers " + str(tickers) + error_msg)
        # add time stemp in the list
        data = {"time": current_time, "quotes": data}
        return data
    elif response.status_code == 403:
        raise AuthenticationError("Incorrect Key")
    else:
        data = response.json()["error"]
        raise ValueError(data)


def get_intra_day_historical_price(ticker: str, interval: str):
    """get intraday qutote"""

    # validate interval
    if not (interval.lower() in ["1min", "5min", "15min", "30min", "1hour", "4hour"]):
        raise ValueError("Invalid interval: " + interval)
    error_msg = ""
    url = FMP_ROOT_URL + f"v3/historical-chart/{interval}/{ticker}"
    params = {"apikey": FMP_KEY}
    response = requests.get(url=url, params=params)

    if response.status_code == 200:
        data = response.json()
        if not (data):
            raise ValueError("No result found for tickers " + str(ticker) + error_msg)
        return data
    elif response.status_code == 403:
        raise AuthenticationError("Incorrect Key")
    else:
        data = response.json()["error"]
        raise ValueError(data)
    pass


def get_company_financial_ratios_custom(
    ticker: str, period: str = "annual", limit: int = 140
):
    raw_ratios = get_company_metrics(ticker=ticker, period=period, limit=limit)
    raw_income_statement = get_company_financial_statements(
        ticker=ticker, statement_type="income-statement", period=period, limit=limit + 3
    )

    df_raw_ratios = pd.DataFrame(raw_ratios)
    df_raw_ratios = df_raw_ratios.iloc[::-1].sort_values(by="date")

    df_raw_income_statement = pd.DataFrame(raw_income_statement)
    df_raw_income_statement = df_raw_income_statement.iloc[::-1].sort_values(by="date")

    # calculate different TTM data
    df_raw_income_statement["ebitda_ttm"] = (
        df_raw_income_statement[["ebitda"]].rolling(4).sum()
    )
    df_raw_income_statement = df_raw_income_statement.tail(-3)

    ls_key = ["date", "symbol", "period"]
    df_result = df_raw_ratios.merge(df_raw_income_statement, how="inner", on=ls_key)
    df_result["enterpriseValueOverEBITDA"] = (
        df_result["enterpriseValue"] / df_result["ebitda_ttm"]
    )
    df_result["period"] = df_result["calendarYear"].astype(str) + df_result[
        "period"
    ].astype(str)

    ls_result = [
        "symbol",
        "date",
        "period",
        "pbRatio",
        "enterpriseValueOverEBITDA",
        "peRatio",
    ]

    return df_result[ls_result].to_dict("records")


def get_company_metrics(ticker: str, period: str = "annual", limit: int = 140):
    """get company ratios"""

    if not (period.lower() in ["annual", "quarter"]):
        raise ValueError("Invalid interval: " + period)
    error_msg = ""
    url = FMP_ROOT_URL + f"v3/key-metrics/{ticker}"
    params = {"apikey": FMP_KEY, "limit": limit}
    if period == "quarter":
        params["period"] = period
    response = requests.get(url=url, params=params)

    if response.status_code == 200:
        data = response.json()
        if not (data):
            raise ValueError("No result found for tickers " + str(ticker) + error_msg)

        return data
    elif response.status_code == 403:
        raise AuthenticationError("Incorrect Key")
    else:
        data = response.json()["error"]
        raise ValueError(data)


def get_company_financial_statements(
    ticker: str, statement_type: str, period: str = "annual", limit: int = 140
):
    """get company financial statements"""
    if not (period.lower() in ["annual", "quarter"]):
        raise ValueError("Invalid interval: " + period)
    if not (
        statement_type.lower()
        in ["income-statement", "balance-sheet-statement", "cash-flow-statement"]
    ):
        raise ValueError("Invalid statement type: " + statement_type)

    error_msg = ""
    url = FMP_ROOT_URL + f"v3/{statement_type}/{ticker}"
    params = {"apikey": FMP_KEY, "limit": limit}
    if period == "quarter":
        params["period"] = period
    response = requests.get(url=url, params=params)

    if response.status_code == 200:
        data = response.json()
        if not (data):
            raise ValueError("No result found for tickers " + str(ticker) + error_msg)

        return u.transform_fundamental_list_to_dict(data)
    elif response.status_code == 403:
        raise AuthenticationError("Incorrect Key")
    else:
        data = response.json()["error"]
        raise ValueError(data)


def get_symbol_list_to_csv():
    """get All Companies ticker symbols available in Financial Modeling Prep"""
    url = FMP_ROOT_URL + f"v3/stock/list"
    params = {"apikey": FMP_KEY}
    response = requests.get(url=url, params=params)

    if response.status_code == 200:
        data = response.json()
        df_data = pd.DataFrame(data)
        df_data.to_excel(r'symbol_list.xlsx')


if __name__ == "__main__":
    # print(get_treasury_rate("2022-07-29"))
    # print(get_stock_price("fff"))
    a = get_stock_price("SPY", to_csv=True)
    print(a)
    pass
