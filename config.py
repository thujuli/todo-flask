from dotenv import load_dotenv
import os
from datetime import timedelta

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# setup postgres
# USERNAME = os.getenv("USERNAME_PSQL")
# PASSWORD = os.getenv("PASSWORD_PSQL")
# HOST = os.getenv("HOST_PSQL")
# DB = os.getenv("DB_PSQL")

DB_URI = "sqlite:///" + os.path.join(BASE_DIR, "data.db")
# DB_PSQL = f"postgresql://{USERNAME}:{PASSWORD}@{HOST}/{DB}"
DB_PSQL = "postgresql://postgres:@localhost/postgres"


class Config:
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = DB_URI
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    # JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)


class DevelopmentConfig(Config):
    DEBUG = True


class StagingConfig(Config):
    SQLALCHEMY_DATABASE_URI = DB_PSQL
    DEBUG = True
