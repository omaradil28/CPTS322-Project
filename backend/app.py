from flask import Flask, jsonify
from flask_cors import CORS
import json
from AccountCreation import account_creation  # Import the account creation Blueprint
from Login import login_blueprint  # Import the login Blueprint
from QuizData import QuizData_blueprint

app = Flask(__name__)
CORS(app) 

# Register Blueprints
app.register_blueprint(account_creation)
app.register_blueprint(login_blueprint)
app.register_blueprint(QuizData_blueprint)

@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        with open("data/emails.json", "r") as file:
            data = json.load(file)
        return jsonify(data["valid_domains"])  # Return only the array (not an object)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
    
# from flask import Flask, jsonify
# from flask_cors import CORS
# import json

# app = Flask(__name__)
# CORS(app)  # Allow frontend to access backend

# @app.route('/')
# def home():
#     return jsonify({"message": "Hello from Flask!"})

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     try:
#         with open("data/emails.json", "r") as file:
#             data = json.load(file)
#         return jsonify(data["valid_domains"])  # Return only the array (not an object)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True)

