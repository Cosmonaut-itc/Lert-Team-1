import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://dmt:WE4ko0phX8lj8RvQZZfd@dmt-lert.cyxducjppxib.us-west-1.rds.amazonaws.com:5432/lert'

