import hashlib
import json
import os

USER_FILE = os.path.join(os.path.dirname(__file__), "data", "users.json")
DOMAINS_FILE = os.path.join(os.path.dirname(__file__), "data", "emails.json")

# Loads user info
def load():
    if os.path.exists(USER_FILE):
        try:
            with open(USER_FILE, "r") as file:
                data = file.read().strip()
                return json.loads(data) if data else {}
        except json.JSONDecodeError:
            return {}
    return {}

# Decrypts passowrd
def hashing(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Username and Password input for login
def login():
    os.system('clear')
    print("Login\n")
    users = load()

    while True:
        username = input("Enter your username: ").strip()
        if username in users:
            break
        else:
            print("Username not found. Try again.")
            print()

    while True:
        password = input("Enter your password: ").strip()
        if hashing(password) == users[username]["password"]:
            break
        else:
            print("Incorrect password. Try again.")
            print()

    print()
    print(f"Login successful! Welcome back, {username}.")

    profession = users[username]["profession"]
    print(f"You are logged in as a {profession}.")

login()