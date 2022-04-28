from dotenv import load_dotenv
from sqlalchemy import create_engine
import os

load_dotenv()

class AppConfig:
    SESSION_TYPE = "filesystem"
    SECRET_KEY = os.environ["SECRET_KEY"]
    DB_HOST = os.environ["HOSTNAME"]
    DB_PORT = os.environ["PORT"]
    DB_USER = os.environ["USERNAME_DB"]
    DB_PASSWORD = os.environ["PASSWORD_DB"]
    DB_NAME = os.environ["DB_NAME"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
