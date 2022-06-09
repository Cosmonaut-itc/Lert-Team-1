import json
import secrets
import datetime
from functools import wraps

from argon2 import PasswordHasher
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, login_user, login_required, current_user, logout_user
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
from random import randint

from config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, supports_credentials=True, resources={r'/*': {'origins': ["http://localhost:3000", "http://127.0.0.1:3000"]}})

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import *

app.secret_key = secrets.token_urlsafe(16)

login_manager = LoginManager()
login_manager.init_app(app)


def admin_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
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


@app.route('/signup', methods=['POST'])
# @login_required
# @admin_required
def signup():
    ph = PasswordHasher()

    email = request.form.get('email')
    password = request.form.get('password')
    role = request.form.get('role')
    country_id = request.form.get('country_id')

    user_exists = User.query.filter_by(email=email).first()
    db.session.commit()
    if user_exists:
        return "User already exist", 409
    new_user = User(email=email, password=ph.hash(password), role=role, country_id=country_id, status=0)
    db.session.add(new_user)
    db.session.commit()
    return "Added user", 201


@app.route('/isAuth', methods=['GET'])
@login_required
def isAuth():
    res = {'role': current_user.role}
    db.session.commit()
    return json.dumps(res)


@app.route('/manager/employees', methods=['GET', 'POST', 'PUT', 'DELETE'])
@app.route('/manager/employees/<employee_id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def manager_employees(employee_id=None):
    if request.method == 'GET':
        manager_team = Employee.query.filter_by(user_id=current_user.id)
        db.session.commit()

        if not manager_team:
            return 204

        response = []
        for employee in manager_team:
            foreign_keys_names_dictionary = {
                'country_name': employee.country.name,
                'typeOfEmployee_name': employee.typeOfEmployee.name,
                'band_name': employee.band.name,
                'month1Band_name': employee.month1Band.name,
                'month2Band_name': employee.month2Band.name,
                'ICA_name': employee.ICA.name,
                'squad_name': employee.squad.name,
                'month3_cost': employee.band.salary,
                'month2_cost': employee.month2Band.salary,
                'month1_cost': employee.month1Band.salary,
            }
            response.append(employee.as_dict() | foreign_keys_names_dictionary)

        return jsonify(response[::-1])

    if request.method == 'DELETE':
        employee_exists = Employee.query.filter_by(id=employee_id).first()
        if not employee_exists:
            return "Employee does not exist", 404
        if employee_exists.user_id != current_user.id:
            return "Not your employee", 401

        db.session.delete(employee_exists)
        db.session.commit()

        return "User deleted"

    if request.method == 'POST' or 'PUT':
        # Form
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        country_id = request.form.get('country_id')
        typeOfEmployee_id = request.form.get('typeOfEmployee_id')
        band_id = request.form.get('band_id')
        ICA_id = request.form.get('ICA_id')
        squad_id = request.form.get('squad_id')

        # Internal
        user_id = current_user.id
        employee_id = employee_id

        if request.method == 'POST':
            employee_exists = Employee.query.filter_by(email=email).first()
            db.session.commit()

            if employee_exists:
                return "Employee already exist", 409

            new_employee = Employee(first_name=first_name, last_name=last_name, email=email, country_id=int(country_id),
                                    typeOfEmployee_id=int(typeOfEmployee_id), band_id=int(band_id), ICA_id=int(ICA_id),
                                    squad_id=int(squad_id), user_id=int(user_id), month1Band_id=int(band_id),
                                    month2Band_id=int(band_id), comment="", hour1=0, hour2=0, hour3=0)
            db.session.add(new_employee)
            db.session.commit()
            return "Added Employee", 201

        if request.method == 'PUT':
            employee_exists = Employee.query.filter_by(id=employee_id).first()

            if not employee_exists:
                return "Employee does not exist", 404
            if employee_exists.user_id != current_user.id:
                return "Not your employee", 401

            employee_exists.first_name = first_name
            employee_exists.last_name = last_name
            employee_exists.email = email
            employee_exists.country_id = country_id
            employee_exists.typeOfEmployee_id = typeOfEmployee_id
            employee_exists.band_id = band_id
            employee_exists.ICA_id = ICA_id
            employee_exists.squad_id = squad_id

            db.session.commit()
            return "User added"
    return 400


@app.route('/manager/employees/<employee_id>/recovery', methods=['PUT'])
@login_required
def manager_employees_recovery(employee_id):
    band_id = request.form.get('band_id')
    month1Band_id = request.form.get('month1Band_id')
    month2Band_id = request.form.get('month2Band_id')
    hour1 = request.form.get('hour1')
    hour2 = request.form.get('hour2')
    hour3 = request.form.get('hour3')
    comment = request.form.get('comment')

    employee_exists = Employee.query.filter_by(id=employee_id).first()

    if not employee_exists:
        return "Employee does not exist", 404
    if employee_exists.user_id != current_user.id:
        return "Not your employee", 401

    employee_exists.band_id = band_id
    employee_exists.month1Band_id = month1Band_id
    employee_exists.month2Band_id = month2Band_id

    employee_exists.hour1 = hour1
    employee_exists.hour2 = hour2
    employee_exists.hour3 = hour3

    employee_exists.comment = comment

    db.session.commit()
    return "Recovery added"


@app.route('/manager/expenses', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/manager/expenses/<expense_id>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@login_required
def manager_expenses(expense_id=None):
    if request.method == 'GET':
        manager_expenses = Expense.query.filter_by(user_id=current_user.id)
        db.session.commit()

        if not manager_expenses:
            return 204

        response = []
        for expense in manager_expenses:
            foreign_keys_names_dictionary = {
                'ICA_name': expense.ICA.name,
                'typeOfExpense_name': expense.type_of_expense.name,
                'user_email': expense.user.email
            }
            response.append(expense.as_dict() | foreign_keys_names_dictionary)

        return jsonify(response[::-1])

    if request.method == 'POST' or 'PUT':
        description = request.form.get('description')
        employee_email = request.form.get('employee_email')
        cost = request.form.get('cost')
        ICA_email = request.form.get('ICA_email')
        ICA_id = request.form.get('ICA_id')
        admin_email = request.form.get('admin_email')
        comments = request.form.get('comments')
        typeOfExpense_id = request.form.get('typeOfExpense_id')

        if request.method == 'POST':
            # Creates the new row by using the built-in model Expense
            new_expense = Expense(description=description, employee_email=employee_email, cost=cost,
                                  ICA_email=ICA_email,
                                  ICA_id=ICA_id, typeOfExpense_id=typeOfExpense_id, admin_email=admin_email,
                                  comments=comments, user_id=current_user.id)

            # Adds and commits the expense to the db
            db.session.add(new_expense)
            db.session.commit()

            return "Added expense", 201

        if request.method == 'PUT':
            expense_exists = Expense.query.filter_by(id=expense_id).first()

            if not expense_exists:
                return "Expense does not exist", 404
            if expense_exists.user_id != current_user.id:
                return "Not your expense", 401

            expense_exists.description = description
            expense_exists.employee_email = employee_email
            expense_exists.cost = cost
            expense_exists.typeOfExpense_id = typeOfExpense_id
            expense_exists.ICA_id = ICA_id
            expense_exists.ICA_email = ICA_email
            expense_exists.admin_email = admin_email
            expense_exists.comments = comments

            db.session.commit()
            return "Expense added"

    if request.method == 'DELETE':
        expense_exists = Expense.query.filter_by(id=expense_id).first()
        if not expense_exists:
            return "Expense does not exist", 404
        if expense_exists.user_id != current_user.id:
            return "Not your expense", 401

        db.session.delete(expense_exists)
        db.session.commit()

        return "Expense deleted"

    @app.route('/manager/status', methods=['GET', 'PUT'])
    @login_required
    def manager_status():
        if request.method == 'GET':
            return {'status_id': current_user.status}

        new_status = request.form.get('status_id')
        print(new_status)
        user_exists = User.query.filter_by(id=current_user.id).first()
        if not user_exists:
            return "Error finding your user", 404
        user_exists.status = new_status
        db.session.commit()
        return "User added"


@app.route('/manager/delegates', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/manager/delegates/<delegate_id>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@login_required
def manager_delegates(delegate_id=None):
    if request.method == 'GET':
        delegates = Delegate.query.filter_by(user_id=current_user.id)
        db.session.commit()

        if not delegates:
            return 204

        response = []
        for delegate in delegates:
            response.append(delegate.as_dict())

        return jsonify(response[::-1])

    if request.method == 'POST' or 'PUT':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')

        if request.method == 'POST':
            new_delegate = Delegate(first_name=first_name, last_name=last_name, email=email, user_id=current_user.id)

            # Adds and commits the expense to the db
            db.session.add(new_delegate)
            db.session.commit()

            return "Added delegate", 201

        if request.method == 'PUT':
            delegate_exists = Delegate.query.filter_by(id=delegate_id).first()

            if not delegate_exists:
                return "Delegate does not exist", 404
            if delegate_exists.user_id != current_user.id:
                return "Not your delegate", 401

            delegate_exists.first_name = first_name
            delegate_exists.last_name = last_name
            delegate_exists.email = email

            db.session.commit()
            return "Delegate modified"

    if request.method == 'DELETE':
        delegate_exists = Delegate.query.filter_by(id=delegate_id).first()
        if not delegate_exists:
            return "Delegate does not exist", 404
        if delegate_exists.user_id != current_user.id:
            return "Not your delegate", 401

        db.session.delete(delegate_exists)
        db.session.commit()

        return "Delegate deleted"

    @app.route('/manager/status', methods=['GET', 'PUT'])
    @login_required
    def manager_status():
        if request.method == 'GET':
            return {'status_id': current_user.status}

        new_status = request.form.get('status_id')
        print(new_status)
        user_exists = User.query.filter_by(id=current_user.id).first()
        if not user_exists:
            return "Error finding your user", 404
        user_exists.status = new_status
        db.session.commit()
        return "User added"


@app.route('/manager/squads', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/manager/squads/<squad_id>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@login_required
def manager_squads(squad_id=None):
    if request.method == 'GET':
        squads = Squad.query.filter_by(user_id=current_user.id)
        db.session.commit()

        if not squads:
            return 204

        response = []
        for squad in squads:
            response.append(squad.as_dict())

        return jsonify(response[::-1])

    if request.method == 'POST' or 'PUT':
        name = request.form.get('name')

        if request.method == 'POST':
            new_squad = Squad(name=name, user_id=current_user.id)

            # Adds and commits the expense to the db
            db.session.add(new_squad)
            db.session.commit()

            return "Added delegate", 201

        if request.method == 'PUT':
            squad_exists = Squad.query.filter_by(id=squad_id).first()

            if not squad_exists:
                return "Squad does not exist", 404
            if squad_exists.user_id != current_user.id:
                return "Not your Squad", 401

            squad_exists.name = name
            db.session.commit()
            return "Squad modified"

    if request.method == 'DELETE':
        squad_exists = Squad.query.filter_by(id=squad_id).first()
        if not squad_exists:
            return "Squad does not exist", 404
        if squad_exists.user_id != current_user.id:
            return "Not your Squad", 401

        db.session.delete(squad_exists)
        db.session.commit()

        return "Squad deleted"


@app.route('/email', methods=['GET'])
@login_required
def user_email():
    res = {'email': current_user.email}
    db.session.commit()
    return json.dumps(res)


@app.route('/quarter', methods=['GET'])
def quarter():
    months = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }
    result = {}
    current_time = datetime.datetime.now()
    current_q = (current_time.month // 3)
    j = 0

    for i in range(current_q * 3 - 2, current_q * 3 + 1):
        result[j] = months[i]
        j = j + 1

    return result


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
    ICAS = ICA.query.filter_by(country_id=current_user.country_id)
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
    bands = Band.query.filter_by(country_id=current_user.country_id)
    db.session.commit()
    if not bands:
        return 204

    response = []
    for band in bands:
        response.append(band.as_dict())

    return jsonify(response)


@app.route('/typesOfEmployee')
@login_required
def typesOfEmployee():
    typesOfEmployee = TypeOfEmployee.query.filter_by(country_id=current_user.country_id)
    db.session.commit()
    if not typesOfEmployee:
        return 204

    response = []
    for typeOfEmployee in typesOfEmployee:
        response.append(typeOfEmployee.as_dict())

    return jsonify(response)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return "Logged out"


@app.route('/typesOfExpenses', methods=['GET', 'POST'])
@login_required
def types_of_expenses():
    if request.method == 'GET':
        type_expense = TypeOfExpense.query.filter_by(country_id=current_user.country_id)
        db.session.commit()

        if not type_expense:
            return "No type of expense for your user", 404

        response = []
        for expense in type_expense:
            response.append(expense.as_dict())

        return jsonify(response), 201

    if request.method == 'POST':
        name = request.form.get('name')

        new_type_of_expense = TypeOfExpense(name=name, country_id=current_user.country_id)

        db.session.add(new_type_of_expense)
        db.session.commit()

        return "Type of expense added", 201


if __name__ == '__main__':
    app.run()
