from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from app.core.config import settings


MONGO_URI = settings.MONGO_URI

client = MongoClient(MONGO_URI, server_api=ServerApi("1"))
category_collection = client.product_category_fastapi.category_collection
product_collection = client.product_category_fastapi.product_collection
inquiry_collection = client.product_category_fastapi.inquiry_collection
user_collection = client.product_category_fastapi.user_collection