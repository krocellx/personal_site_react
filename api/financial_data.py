from multiprocessing.sharedctypes import Value
import os

import requests  # noqa: E402
from dotenv import load_dotenv  # noqa: E402
from flask import Flask, request, jsonify, make_response  # noqa: E402
from datetime import datetime  # noqa: E402

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


def get_stock_price(ticker, start_date=None, end_date=None):
    url = FMP_ROOT_URL + "v3/historical-price-full/" + ticker.upper()
    params = {"apikey": FMP_KEY}
    error_msg = ""

    if start_date:
        params["from"] = start_date
        params["to"] = end_date if end_date else start_date
        error_msg = f" from {start_date} to {end_date}"

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
        return data
    else:
        data = response.json()["error"]
        raise ValueError(ticker)


if __name__ == "__main__":
    # print(get_treasury_rate("2022-07-29"))
    # print(get_stock_price("fff"))
    pass
