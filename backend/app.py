from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import AppConfig
from models import db, User

app = Flask(__name__)
app.config.from_object(AppConfig)
db.init_app(app)
bcrypt = Bcrypt(app)
cors = CORS(app, supports_credentials=True)
server_session = Session(app)

with app.app_context():
    db.create_all()

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
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"})

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

if __name__ == "__main__":
    app.run(debug=True)


