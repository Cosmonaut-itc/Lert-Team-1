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
    employees = db.relationship('Employee', backref='user')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True, unique=True)
    users = db.relationship('User', backref='country')
    employees = db.relationship('Employee', backref='country')
    bands = db.relationship('Band', backref='country')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class TypeOfEmployee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True, unique=True)
    employees = db.relationship('Employee', backref='typeOfEmployee')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, index=True)
    last_name = db.Column(db.Text, index=True)
    email = db.Column(db.Text, index=True, unique=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    typeOfEmployee_id = db.Column(db.Integer, db.ForeignKey('type_of_employee.id'))
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'))
    ICA_id = db.Column(db.Integer, db.ForeignKey('ICA.id'))
    squad_id = db.Column(db.Integer, db.ForeignKey('squad.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    salary = db.Column(db.Integer)
    employees = db.relationship('Employee', backref='Band')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class ICA(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)
    employees = db.relationship('Employee', backref='ICA')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Squad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)
    employees = db.relationship('Employee', backref='squad')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class TypeOfExpense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Delegate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)
    last_name = db.Column(db.Text, index=True)
    email = db.Column(db.Text, index=True)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


"""
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, index=True)
    employee_mail = db.Column(db.Text, index=True)
    cost = db.Column(db.Float, index=True)
    type_id = db.Column(db.Text, db.ForeignKey('type_of_expense.id'))
    ICA_id = db.Column(db.Integer, db.ForeignKey('ICA.id'))
    ICA_mail = db.Column(db.Text, index=True)
    admin_mail = db.Column(db.Text, index=True)
    comments = db.Column(db.Text, index=True)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}
"""

# class EmployeeRecovery(db.Model):
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
#     def as_dict(self):
#         return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}
