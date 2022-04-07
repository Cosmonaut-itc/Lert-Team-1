from flask import Flask

api = Flask(__name__)

@api.route('/DMT')
def my_profile():
    response_body = {
        "name": "DMT",
        "about" :"Hello this is DMTeam"
    }
    return response_body