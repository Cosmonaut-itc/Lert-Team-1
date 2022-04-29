from flask_sqlalchemy import SQLAlchemy
import psycopg2
import os

db = SQLAlchemy()

class User(db.Model):
    ## get_db_connection is a function that creates a connection with the aws server.
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.VARCHAR(30), unique=True)
    password = db.Column(db.VARCHAR(1000), nullable=False)
    rol = db.Column(db.VARCHAR(10), nullable=False)

