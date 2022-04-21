<<<<<<< HEAD
from uuid import uuid4
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    
=======
import psycopg2
import os


class User:
    ## get_db_connection is a function that creates a connection with the aws server.
    def get_db_connection(self):
        conn = psycopg2.connect(host=os.environ["HOST_NAME"],
                                database='lert',
                                user=os.environ["USERNAME_DB"],
                                password=os.environ["PASSWORD_DB"])

        return conn
>>>>>>> Development
