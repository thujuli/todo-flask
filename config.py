import os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DB_URI = "sqlite:///" + os.path.join(BASE_DIR, "data.db")


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DB_URL", DB_URI)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
