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


# Fake DB test
TeamDD = [
  {
    'id': 1,
    'name': 'Ken Bauer',
    'email': 'kenbauer@tec.mx',
    'status': 'Temp Down',
  },
  {
    'id': 2,
    'name': 'Ken LOL',
    'email': 'kenbauer@tec.mx',
    'status': 'Temp Down',
  },
  {
    'id': 3,
    'name': 'Ken Bauer',
    'email': 'kenbauer@tec.mx',
    'status': 'Temp Down',
  },
]

TeamDDRes = json.dumps(TeamDD)

## This route is used to authenticate the user once is inside the app.
@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email,
    })

# Register route
@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(id="3", email=email, password=hashed_password, rol="admin")
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
    })

# Login route
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized",
                        "user": user.id})

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email,
    })

#Delete route
@app.route('/delete/<int:id>')
def delete_user(id):
    user_to_delete = User.query.get_or_404(id)

    try:
        db.session.delete(user_to_delete)
        db.session.commit()
    #   after this we could redirect to the frontpage with return redirect('/')
    except:
        return "There was a problem deleting that user..."

if __name__ == "__main__":
    app.run(debug=True)


@app.route('/manager/team')
@cross_origin()
def manager_team():  # put application's code here
    return TeamDDRes

