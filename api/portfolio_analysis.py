from ast import ClassDef
from asyncio import start_server
from msilib.schema import Class
from tracemalloc import start
import pandas as pd
import json
import numpy as np
from dotenv import load_dotenv  # noqa: E402
import financial_data as fd


class Portfolio_Analytics:
    def __init__(self, ticker, benchmark="SPY", start_date=None, end_date=None):
        # define variables
        self.ticker = ticker
        self.benchmark = benchmark
        self.start_date = start_date
        self.end_date = end_date if end_date else start_date

        self.performance_metric = {"ticker": ticker, "benchmark": benchmark}

        self.ticker_data = self.get_data(
            ticker=ticker, start_date=start_date, end_date=end_date
        )

        self.start_date = self.ticker_data.date.iloc[0]

        self.end_date = self.ticker_data.date.iloc[-1]

        self.benchmark_data = self.get_data(
            ticker=benchmark, start_date=self.start_date, end_date=self.end_date
        )

        self.risk_free_rate = fd.get_treasury_rate(self.start_date, self.end_date)

    @staticmethod
    def get_data(ticker, start_date=None, end_date=None):
        # get ticker data
        ticker_data_json = fd.get_stock_price(
            ticker=ticker, start_date=start_date, end_date=end_date
        )
        df_ticker_data = pd.json_normalize(ticker_data_json, "historical", ["symbol"])
        df_ticker_data["date"] = pd.to_datetime(
            df_ticker_data["date"], format="%Y-%m-%"
        )
        df_ticker_data.sort_values(by="date", inplace=True)

        df_ticker_data["year"] = pd.DatetimeIndex(df_ticker_data["date"]).year
        df_ticker_data["month"] = pd.DatetimeIndex(df_ticker_data["date"]).month
        df_ticker_data["date"] = df_ticker_data["date"].astype(str)
        df_ticker_data["adjClosePctChange"] = df_ticker_data.adjClose.pct_change(1)
        df_ticker_data["adjCloseLogRet"] = np.log(df_ticker_data.adjClose) - np.log(
            df_ticker_data.adjClose.shift(1)
        )

        return df_ticker_data

    def default_performance_analysis(self):
        self.cal_performance_metric()
        return self.performance_result_json()

    def cal_performance_metric(self):
        # mean return
        monthly_return = (
            self.ticker_data.groupby(["year", "month"])["adjCloseLogRet"]
            .sum()
            .reset_index()
        )
        yearly_return = (
            self.ticker_data.groupby("year")["adjCloseLogRet"].sum().reset_index()
        )

        self.performance_metric["monthly_return_mean"] = (
            monthly_return["adjCloseLogRet"].mean().round(2)
        )

        self.performance_metric["annual_return_mean"] = (
            yearly_return["adjCloseLogRet"].mean().round(2)
        )

        self.monthly_return = monthly_return.round(2)
        self.yearly_return = yearly_return.round(2)

        # sharp ratio

    def performance_result_json(self):
        ticker_json = {}
        ticker_json["historical"] = self.ticker_data.to_json(orient="records")
        ticker_json["symbol"] = self.ticker

        benchmark_json = {}
        benchmark_json["historical"] = self.benchmark_data.to_json(orient="records")
        benchmark_json["symbol"] = self.benchmark

        # performance_metric = {"performance_metric": self.performance_metric}

        chart_data = {
            "annual_return": self.yearly_return.to_json(orient="records"),
            "monthly_return": self.monthly_return.to_json(orient="records"),
        }

        return_json = {
            "ticker": ticker_json,
            "benchmark": benchmark_json,
            "performance_metric": self.performance_metric,
            "chart_data": chart_data,
        }

        return return_json


if __name__ == "__main__":
    test = Portfolio_Analytics(
        ticker="AAPL", start_date="2022-07-28", end_date="2022-07-29"
    )
