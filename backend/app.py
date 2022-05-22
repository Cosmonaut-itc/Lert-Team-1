import json
import logging
import secrets
from functools import wraps
from time import sleep

from argon2 import PasswordHasher
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta

from config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, supports_credentials=True, )

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
def login():
    ph = PasswordHasher()

    email = request.form['email']
    password = request.form['password']

    user = User.query.filter_by(email=email).first()
    db.session.commit()
    if not user or not ph.verify(user.password, password):
        return "Invalid password ", 401

    login_user(user, remember=True, duration=timedelta(days=5))
    return json.dumps({'role': user.role})


@app.route('/manager/employees', methods=['GET'])
@login_required
def manager_employees():
    # manager_team = Employee.query.filter_by(user_id=current_user.id)

    manager_team = Employee.query.filter_by(user_id=current_user.id)
    db.session.commit()

    if not manager_team:
        return 204

    response = []
    for employee in manager_team:
        foreign_keys_names_dictionary = {
            'country_name': employee.country.name,
            'typeOfEmployee_name': employee.typeOfEmployee.name,
            'band_name': employee.Band.name,
            'ICA_name': employee.ICA.name,
            'squad_name': employee.squad.name
        }
        response.append(employee.as_dict() | foreign_keys_names_dictionary)

    return jsonify(response)


@app.route('/countries')
@login_required
def countries():
    countries = Country.query.all()
    db.session.commit()
    if not countries:
        return 204

    response = []
    for country in countries:
        response.append(country.as_dict())

    return jsonify(response)


@app.route('/ICAS')
@login_required
def ICAS():
    ICAS = ICA.query.all()
    db.session.commit()
    if not ICAS:
        return 204

    response = []
    for ica in ICAS:
        response.append(ica.as_dict())

    return jsonify(response)


@app.route('/bands')
@login_required
def bands():
    bands = Band.query.all()
    db.session.commit()
    if not bands:
        return 204

    response = []
    for band in bands:
        response.append(band.as_dict())

    return jsonify(response)


@app.route('/squads')
@login_required
def squads():
    squads = Squad.query.all()
    db.session.commit()
    if not squads:
        return 204

    response = []
    for squad in squads:
        response.append(squad.as_dict())

    return jsonify(response)


@app.route('/typesOfEmployee')
@login_required
def typesOfEmployee():
    typesOfEmployee = TypeOfEmployee.query.all()
    db.session.commit()
    if not typesOfEmployee:
        return 204

    response = []
    for typeOfEmployee in typesOfEmployee:
        response.append(typeOfEmployee.as_dict())

    return jsonify(response)


@app.route('/protected')
@login_required
@admin_required
def protected():
    return "Hello world" + " " + current_user.email


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return "Logged out"


if __name__ == '__main__':
    app.run()
