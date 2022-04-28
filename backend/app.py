from flask import Flask, jsonify, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from models import User

app = Flask(__name__)

bcrypt = Bcrypt(app)
cors = CORS(app, supports_credentials=True)
server_session = Session(app)

app = Flask(__name__)
bcrypt = Bcrypt(app)
cors = CORS(app, supports_credentials=True)
server_session = Session(app)
app.secret_key= "jdjskadkaskdalsd"


## This route is used to authenticate the user once is inside the app.
@app.route("/@me")
def get_current_user():
    return "Hello World"


@app.route("/register", methods=["POST"])
def register_user():
    return "Hello World"

# Login route
@app.route("/login", methods=["POST"])
def login_user():
    user = User()  #Calls the class created in models.py in order to create a connection to de aws server
    email = 1  #Test email
    #password = request.json["password"] TODO: Create a register form in order to encrypt the passwords in the db
    conn = user.get_db_connection()  #Creates the connection to the db through the class in model.py
    cur = conn.cursor() #Creates a cursor in order to make the queries to the db
    cur.execute('SELECT * FROM users WHERE id = %s' % email) #Makes the query to the bd in order to get the email
    user = cur.fetchone() #Gets a tuple from the query above, it must look like (id, email, password, rol)

    if user is None: #Auth if the user is present in the bd
        return jsonify({"error": "Unauthorized"}), 401

    #TODO: Create a register form

    # if not bcrypt.check_password_hash(user.password, password):
    # return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user[0] #Stores the user id in the cookies


    return jsonify({
        "id": user.id,
        "email": user.email,
    })

if __name__ == "__main__":
    app.run(debug=True)


