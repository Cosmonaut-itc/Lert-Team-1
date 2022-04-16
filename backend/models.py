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
