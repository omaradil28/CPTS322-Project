# Added Omar's code for account creation
import json
import hashlib
import os
from Verification import verification

USER_FILE = os.path.join(os.path.dirname(__file__), "data", "users.json")
DOMAINS_FILE = os.path.join(os.path.dirname(__file__), "data", "emails.json")

# Load user info
def load():
    if os.path.exists(USER_FILE):
        try:
            with open(USER_FILE, "r") as file:
                data = file.read().strip()
                return json.loads(data) if data else {}
        except json.JSONDecodeError:
            return {}
    return {}

# Load email domains
def load_domains():
    if os.path.exists(DOMAINS_FILE):
        with open(DOMAINS_FILE, "r") as file:
            data = json.load(file)
            return data.get("valid_domains", [])
    return {}

# Save user info
def save(users):
    with open(USER_FILE, "w") as file:
        json.dump(users, file, indent=4)

# Password encryption
def hashing(password):
    return hashlib.sha256(password.encode()).hexdigest()

# User input for account creation
def creation():
    os.system('clear')
    print("Account Registration\n")
    users = load()
    valid_domains = load_domains()

    while True:
        print("Please choose one of the following options: \n1. Instructor\n2. Student\n")
        profession = input("Selection: ")
        print()
        if profession =='1' or profession == '2':
            break
        else:
            print("Invalid selection. Please enter 1 or 2")
            print()


    while True:
        username = input("Enter a username: ")
        print()
        if username in users:
            print("Username already taken. Try another one.")
            print()
        else:
            break
       

    while True:
        email = input("Enter an email: ").strip()
        print()
        domain = email.split('@')[-1].strip()

        if domain not in valid_domains:
            print("Invalid email domain. Please enter an email with a valid domain.")
            print()
        elif any(info.get("email") == email for info in users.values()):
            print("Email already taken. Try another one.")
            print()
        else:
            break

    while True:    
        password = input("Enter a password: ")
        confirm_password = input("Confirm password: ")
        print()
        if password != confirm_password:
            print("Passwords do not match")
            print()
        else:
            break
    
    otp = verification(email)
    while True:
        verify = input("Please Enter Verification Code: ")
        print()
        if verify.strip() != otp:
            print("Incorrect Verification Code.")
            resend = input("Would you like to resend the verification code? (y/n): ").strip().lower()
            if resend == 'y':
                otp = verification(email)
        else:
            break

    users[username] = {
        "email": email,
        "password": hashing(password),
        "profession": "Instructor" if profession == '1' else "Student"
    }

    save(users)
    print()
    print("Account created successfully")

creation()