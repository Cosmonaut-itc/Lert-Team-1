from app import db
from flask_login import UserMixin

ACCESS = {
    'manager': 0,
    'ops_manager': 1,
    'admin': 2
}


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, index=True)
    last_name = db.Column(db.Text, index=True)
    email = db.Column(db.Text, index=True, unique=True)
    password = db.Column(db.Text)
    role = db.Column(db.Integer)
    status = db.Column(db.Integer, index=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))

    employees = db.relationship('Employee', backref='user')
    expenses = db.relationship('Expense', backref='user')
    delegates = db.relationship('Delegate', backref='user')
    squads = db.relationship('Squad', backref='user')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class CountryRef(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)
    code = db.Column(db.Text, index=True)
    countries = db.relationship('Country', backref='countryRef')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True, unique=True)
    countryRef_id = db.Column(db.Integer, db.ForeignKey('country_ref.id'))

    users = db.relationship('User', backref='country')
    employees = db.relationship('Employee', backref='country')
    bands = db.relationship('Band', backref='country')
    ICAs = db.relationship('ICA', backref='country')
    typeOfEmployees = db.relationship('TypeOfEmployee', backref='country')
    typeOfExpenses = db.relationship('TypeOfExpense', backref='country')


    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class TypeOfEmployee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True, unique=True)
    employees = db.relationship('Employee', backref='typeOfEmployee')
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, index=True)
    last_name = db.Column(db.Text, index=True)
    email = db.Column(db.Text, index=True, unique=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    typeOfEmployee_id = db.Column(db.Integer, db.ForeignKey('type_of_employee.id'))
    ICA_id = db.Column(db.Integer, db.ForeignKey('ICA.id'))
    squad_id = db.Column(db.Integer, db.ForeignKey('squad.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    band_id = db.Column(db.Integer, db.ForeignKey('band.id'))
    month1Band_id = db.Column(db.Integer, db.ForeignKey('band.id'))
    month2Band_id = db.Column(db.Integer, db.ForeignKey('band.id'))

    comment = db.Column(db.Text)
    hour1 = db.Column(db.Integer)
    hour2 = db.Column(db.Integer)
    hour3 = db.Column(db.Integer)

    band = db.relationship("Band", foreign_keys=[band_id])
    month1Band = db.relationship("Band", foreign_keys=[month1Band_id])
    month2Band = db.relationship("Band", foreign_keys=[month2Band_id])

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    salary = db.Column(db.Float)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class ICA(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    employees = db.relationship('Employee', backref='ICA')
    expenses = db.relationship('Expense', backref='ICA')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Squad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    employees = db.relationship('Employee', backref='squad')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class TypeOfExpense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, index=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    expenses = db.relationship('Expense', backref='type_of_expense')

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Delegate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, index=True)
    last_name = db.Column(db.Text, index=True)
    email = db.Column(db.Text, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}


class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, index=True)
    employee_email = db.Column(db.Text, index=True)
    cost = db.Column(db.Float, index=True)
    typeOfExpense_id = db.Column(db.Integer, db.ForeignKey('type_of_expense.id'))
    ICA_id = db.Column(db.Integer, db.ForeignKey('ICA.id'))
    ICA_email = db.Column(db.Text, index=True)
    admin_email = db.Column(db.Text, index=True)
    comments = db.Column(db.Text, index=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}
