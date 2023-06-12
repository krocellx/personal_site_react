import os
from re import S

import sys

fpath = os.path.dirname(__file__)
sys.path.append(fpath)

import requests  # noqa: E402
from flask import Flask, request, jsonify, make_response, render_template  # noqa: E402
from dotenv import load_dotenv  # noqa: E402
from flask_cors import CORS  # noqa: E402
import pandas as pd

from mongo_client import mongo_client  # noqa: E402
import financial_data as fd  # noqa: E402
import portfolio_analysis as pa  # noqa: E402
from datetime import datetime  # noqa: E402
from portfolio_construction_engine.engine import Factor, Portfolio


gallery = mongo_client.gallery
images_collection = gallery.images

equity_price_collection = mongo_client.equity.price

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert there UNSPLASH_KEY"
    )

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/")
@app.route("/api/home")
def home():
    return {"response": "Welcome to Harvey's API"}


@app.route("/api/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Accept-Version": "V1", "Authorization": "Client-ID " + UNSPLASH_KEY}
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)

    data = response.json()
    return data


@app.route("/api/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        # read images from the database
        images_get = images_collection.find({})
        return jsonify([img for img in images_get])

    if request.method == "POST":
        # save image in the database
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


@app.route("/api/images/<image_id>", methods=["DELETE"])
def images_delete(image_id):
    if request.method == "DELETE":
        # delete image from the database
        result = images_collection.delete_one({"_id": image_id})
        if not result:
            return {"error": "Image wasn't deleted. Please try again"}, 500
        if result and not result.deleted_count:
            return {"error": "Image not found"}, 404
        return {"deleted_id": image_id}


@app.route("/api/stock_price", methods=["GET"])
def stock_price():
    ticker = request.args.get("ticker")
    start_date = request.args.get("startDate")
    end_date = request.args.get("endDate")

    try:
        data = fd.get_stock_price(
            ticker=ticker, start_date=start_date, end_date=end_date
        )
    except Exception as e:
        data = make_response(jsonify({"error": str(e)}), 404)
    return data


@app.route("/api/stock-performance", methods=["GET"])
def stock_performance():
    ticker = request.args.get("ticker")
    benchmark = request.args.get("benchmark")
    start_date = request.args.get("startDate")
    end_date = request.args.get("endDate")

    try:
        performance_analysis = pa.Portfolio_Analytics(
            ticker=ticker.upper(),
            benchmark=benchmark.upper(),
            start_date=start_date,
            end_date=end_date,
        )

        data = make_response(
            jsonify(performance_analysis.default_performance_analysis()), 200
        )
    except Exception as e:
        data = make_response(jsonify({"error": str(e)}), 404)
    return data


@app.route("/api/stock-quote", methods=["GET"])
def stock_quote():
    tickers = request.args.get("tickers")
    ls_ticker = tickers.split(",")
    try:
        data = fd.get_live_quote(ls_ticker)
        data = make_response(jsonify(data), 200)

    except Exception as e:
        data = make_response(jsonify({"error": str(e)}), 404)
    return data


@app.route("/api/intra-day-historical-prices", methods=["GET"])
def intr_day_historical_prices():
    ticker = request.args.get("ticker")
    interval = request.args.get("interval")
    try:
        data = fd.get_intra_day_historical_price(ticker, interval)
        data = make_response(jsonify(data), 200)

    except Exception as e:
        data = make_response(jsonify({"error": str(e)}), 404)
    return data


@app.route("/api/company-ratios", methods=["GET"])
def company_ratios():
    ticker = request.args.get("ticker")
    try:
        data = fd.get_company_financial_ratios_custom(
            ticker, period="quarter", limit=20
        )
        data = make_response(jsonify(data), 200)

    except Exception as e:
        data = make_response(jsonify({"error": str(e)}), 404)
    return data


@app.route("/api/replication-factor-investing-using-cmas", methods=["GET"])
def replication_factor_investing_using_cmas():
    html_path = os.path.join(fpath, "html/Replication_Factor_Investing_Using_CMAs.html")
    with open(html_path, "r", encoding="utf-8") as html_file:
        html_code = html_file.read()
    return html_code


@app.route("/api/factor_exposure", methods=["GET"])
def get_factor_exposure_example():
    ticker = request.args.get("ticker")
    try:
        print(ticker)
        sample_data_dir = os.path.join(fpath, 'portfolio_construction_engine', 'temp_data')
        factor_data_model = Factor(os.path.join(sample_data_dir, 'q5_factors_daily_2022.csv'))
        # spy = pd.read_csv(os.path.join(sample_data_dir, 'SPY_historical_price.csv'))
        # spy.rename(columns={'adjClose': 'value'}, inplace=True)
        equity_price_get = equity_price_collection.find({'ticker': ticker.upper()})
        ls_equity_price_get = list(equity_price_get)
        df_eq_price = pd.DataFrame(ls_equity_price_get)
        df_eq_price.rename(columns={'Date': 'date', 'Close': 'value'}, inplace=True)
        df_eq_price = df_eq_price[['ticker', 'date', 'value']]
        df_eq_price['date'] = pd.to_datetime(df_eq_price['date'], utc=True).dt.tz_localize(None).dt.normalize()
        assets = [ticker.upper()]
        weights = [1]

        portfolio = Portfolio(assets, weights, historical_prices=df_eq_price)

        result = factor_data_model.calculate_exposures(portfolio)

        data = make_response(jsonify(result), 200)
    except Exception as e:
        data = make_response(jsonify({"error": str(e)}), 404)
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
