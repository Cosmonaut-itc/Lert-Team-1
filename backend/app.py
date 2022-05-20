import json
import logging
import secrets
from functools import wraps

from argon2 import PasswordHasher
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, support_credentials=True)
logging.getLogger('flask_cors').level = logging.DEBUG

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import *

app.secret_key = secrets.token_urlsafe(16)

login_manager = LoginManager()
login_manager.init_app(app)


def admin_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        print(current_user.role)
        if current_user.role != 2:
            return "Permission denied"
        return func(*args, **kwargs)

    return decorated_view


def ops_manager_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if current_user.role != 1:
            return "Permission denied"
        return func(*args, **kwargs)

    return decorated_view


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/signup', methods=['POST'])
@login_required
@admin_required
def signup():
    ph = PasswordHasher()

    email = request.form.get('email')
    password = request.form.get('password')
    role = request.form.get('role')
    country = request.form.get('country')

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return "User already exist", 409
    new_user = User(email=email, password=ph.hash(password), role=role, country=country)
    db.session.add(new_user)
    db.session.commit()
    return "Added user", 201


@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    ph = PasswordHasher()

    email = request.form['email']
    password = request.form['password']

    user = User.query.filter_by(email=email).first()
    if not user or not ph.verify(user.password, password):
        return "Invalid password ", 401

    login_user(user)
    print(user.role)
    return json.dumps({'role': user.role})


@app.route('/manager/team')
def manager_team():  # put application's code here
    return "ROUTES"


@app.route('/protected')
@login_required
@admin_required
def protected():  # put application's code here
    return "Hello world" + " " + current_user.email


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return "Logged out"


if __name__ == '__main__':
    app.run()
