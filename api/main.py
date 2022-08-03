import os
from re import S

import sys

fpath = os.path.dirname(__file__)
sys.path.append(fpath)


import requests  # noqa: E402
from flask import Flask, request, jsonify, make_response  # noqa: E402
from dotenv import load_dotenv  # noqa: E402
from flask_cors import CORS  # noqa: E402
from mongo_client import mongo_client  # noqa: E402
import financial_data as fd  # noqa: E402
import portfolio_analysis as pa  # noqa: E402
from datetime import datetime  # noqa: E402


gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
FMP_HIST_URL = "https://financialmodelingprep.com/api/v3/historical-price-full/"
FMP_KEY = os.environ.get("FMP_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert there UNSPLASH_KEY"
    )

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/api/home")
def home():
    return {"response": "Welcome to the API"}


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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
