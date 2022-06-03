import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://dmt:nEUshAPVvSHnH8xHvSbUuXO@dmtlert.cyxa9cbb3dg0.us-east-1.rds.amazonaws.com:5432/lert'

