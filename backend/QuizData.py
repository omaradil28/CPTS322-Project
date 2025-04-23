from flask import Blueprint, request, jsonify
import json
import os

QuizData_blueprint = Blueprint('quiz', __name__)
DATA_PATH = "data/quizzes.json"

def load_quizzes_from_file():
    if os.path.exists(DATA_PATH):
        with open(DATA_PATH, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

def save_quizzes_to_file(quizzes):
    try:
        with open(DATA_PATH, "w") as f:
            json.dump(quizzes, f, indent=4)
    except Exception as e:
        print("Error saving quizzes:", str(e))

@QuizData_blueprint.route('/quiz', methods=['POST'])
def create_quiz():
    data = request.json
    quizzes = load_quizzes_from_file()
    quiz_id = data.get('quizID')

    if not quiz_id:
        return jsonify({"error": "quizID is required"}), 400

    quizzes.append(data)  
    save_quizzes_to_file(quizzes)  

    return jsonify({"message": "Quiz saved successfully", "quiz": data}), 201

@QuizData_blueprint.route('/quiz/<quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    quizzes = load_quizzes_from_file()
    quiz = next((q for q in quizzes if q['quizID'] == quiz_id), None)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    return jsonify(quiz)

@QuizData_blueprint.route('/quizzes', methods=['GET'])
def get_all_quizzes():
    quizzes = load_quizzes_from_file() 
    return jsonify(quizzes)

@QuizData_blueprint.route('/quiz/<quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    quizzes = load_quizzes_from_file() 
    quiz = next((q for q in quizzes if q['quizID'] == quiz_id), None)

    if quiz:
        quizzes = [q for q in quizzes if q['quizID'] != quiz_id]  
        save_quizzes_to_file(quizzes)  
        return jsonify({"message": "Quiz deleted successfully"}), 200
    else:
        return jsonify({"error": "Quiz not found"}), 404
