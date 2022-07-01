import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)
MONGO_CLIENT = os.environ.get("MONGO_CLIENT", "")

if MONGO_CLIENT == "MONGODB_ATLAS":
    mongo_client = MongoClient(MONGO_URL)
else:
    mongo_client = MongoClient(
        host=MONGO_URL,
        username=MONGO_USERNAME,
        password=MONGO_PASSWORD,
        port=MONGO_PORT,
    )


def insert_test_document():
    """Inserts sample document to the test_collection in the test db"""
    db = mongo_client.test
    test_collection = db.test_collection
    res = test_collection.insert_one({"name": "Harvey", "owner": True})
    print(res)


if __name__ == "__main__":
    insert_test_document()
