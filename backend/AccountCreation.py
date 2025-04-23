from flask import Blueprint, request, jsonify
import json
import hashlib
import os

account_creation = Blueprint("account_creation", __name__)

USER_FILE = os.path.join(os.path.dirname(__file__), "data", "users.json")

def load_users():
    if os.path.exists(USER_FILE):
        try:
            with open(USER_FILE, "r") as file:
                data = file.read().strip()
                return json.loads(data) if data else {}
        except json.JSONDecodeError:
            return {}
    return {}


def save_users(users):
    with open(USER_FILE, "w") as file:
        json.dump(users, file, indent=4)


def hashing(password):
    return hashlib.sha256(password.encode()).hexdigest()

@account_creation.route('/api/create-account', methods=['POST'])
def create_account():
    print("Account creation endpoint hit") 
    try:
        data = request.json
        print(f"Received data: {data}") 

        users = load_users()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        confirm_password = data.get("confirm_password")
        profession = data.get("profession")

        if username in users:
            return jsonify({"error": "Username already taken."}), 400

        if password != confirm_password:
            return jsonify({"error": "Passwords do not match."}), 400

        users[username] = {
            "email": email,
            "password": hashing(password),
            "profession": profession
        }
        save_users(users)
        print("Saved user data")

        print(f"User {username} created successfully.") 
        return jsonify({"message": "Account created successfully!"}), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An internal error occurred."}), 500
    
# from flask import Flask, request, jsonify
# import json
# import hashlib
# import os
# from Verification import verification
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# USER_FILE = os.path.join(os.path.dirname(__file__), "data", "users.json")
# DOMAINS_FILE = os.path.join(os.path.dirname(__file__), "data", "emails.json")

# # Load user info
# def load():
#     if os.path.exists(USER_FILE):
#         try:
#             with open(USER_FILE, "r") as file:
#                 data = file.read().strip()
#                 return json.loads(data) if data else {}
#         except json.JSONDecodeError:
#             return {}
#     return {}

# # Load email domains
# def load_domains():
#     if os.path.exists(DOMAINS_FILE):
#         with open(DOMAINS_FILE, "r") as file:
#             data = json.load(file)
#             return data.get("valid_domains", [])
#     return {}

# # Save user info
# def save(users):
#     with open(USER_FILE, "w") as file:
#         json.dump(users, file, indent=4)

# # Password encryption
# def hashing(password):
#     return hashlib.sha256(password.encode()).hexdigest()

# # API endpoint for account creation
# @app.route('/api/create-account', methods=['POST'])
# def create_account():
#     try:
#         data = request.json
#         print(f"Received data: {data}")  # Debugging: Log received data

#         users = load()
#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")
#         confirm_password = data.get("confirm_password")
#         profession = data.get("profession")

#         # Validate username
#         if username in users:
#             return jsonify({"error": "Username already taken."}), 400

#         # Validate password
#         if password != confirm_password:
#             return jsonify({"error": "Passwords do not match."}), 400

#         # Save user
#         users[username] = {
#             "email": email,
#             "password": hashing(password),
#             "profession": profession
#         }
#         save(users)

#         print(f"User {username} created successfully.")  # Debugging: Log success
#         return jsonify({"message": "Account created successfully!"}), 201

#     except Exception as e:
#         print(f"Error: {e}")  # Debugging: Log the error
#         return jsonify({"error": "An internal error occurred."}), 500

# if __name__ == '__main__':
#     app.run(debug=True)