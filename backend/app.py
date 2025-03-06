from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/data')
def data():
    return jsonify({"data": ["Flask", "React", "API"]})


if __name__ == '__main__':
    app.run(debug=True)
