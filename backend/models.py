from app import db
from flask_login import UserMixin

ACCESS = {
    'manager': 0,
    'ops_manager': 1,
    'admin': 2
}


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, index=True, unique=True)
    password = db.Column(db.Text)
    role = db.Column(db.Integer)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))


class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True, unique=True)
    users = db.relationship('User', backref='country')
    employees = db.relationship('Employee', backref='country')
    bands = db.relationship('Band', backref='country')


class TypeOfEmployee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True, unique=True)
    employees = db.relationship('Employee', backref='typeOfEmployee')


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, index=True)
    last_name = db.Column(db.Text, index=True)
    email = db.Column(db.Text, index=True, unique=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    typeOfEmployee_id = db.Column(db.Integer, db.ForeignKey('type_of_employee.id'))


class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    salary = db.Column(db.Integer)

db.create_all()
db.session.commit()
