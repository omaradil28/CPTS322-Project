from flask import Flask, request, jsonify
import hashlib
import json
import os

app = Flask(__name__)

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

def hashing(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/api/login', methods=['POST'])
def login():
    users = load_users()
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username not in users:
        return jsonify({"error": "Username not found"}), 404

    if hashing(password) != users[username]["password"]:
        return jsonify({"error": "Incorrect password"}), 401

    return jsonify({
        "message": "Login successful",
        "username": username,
        "profession": users[username]["profession"]
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
    
# # Added Omar's code 
# import hashlib
# import json
# import os

# USER_FILE = os.path.join(os.path.dirname(__file__), "data", "users.json")
# DOMAINS_FILE = os.path.join(os.path.dirname(__file__), "data", "emails.json")

# # Loads user info
# def load():
#     if os.path.exists(USER_FILE):
#         try:
#             with open(USER_FILE, "r") as file:
#                 data = file.read().strip()
#                 return json.loads(data) if data else {}
#         except json.JSONDecodeError:
#             return {}
#     return {}

# # Decrypts passowrd
# def hashing(password):
#     return hashlib.sha256(password.encode()).hexdigest()

# # Username and Password input for login
# def login():
#     os.system('clear')
#     print("Login\n")
#     users = load()

#     while True:
#         username = input("Enter your username: ").strip()
#         if username in users:
#             break
#         else:
#             print("Username not found. Try again.")
#             print()

#     while True:
#         password = input("Enter your password: ").strip()
#         if hashing(password) == users[username]["password"]:
#             break
#         else:
#             print("Incorrect password. Try again.")
#             print()

#     print()
#     print(f"Login successful! Welcome back, {username}")

#     profession = users[username]["profession"]
#     print(f"You are logged in as a {profession}.")

# login()