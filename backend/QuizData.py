from flask import Blueprint, request, jsonify
import json
import os

QuizData_blueprint = Blueprint('quiz', __name__)
quizzes = {}
DATA_PATH = "data/quizzes.json"

# Load quizzes from file on startup
if os.path.exists(DATA_PATH):
    with open(DATA_PATH, "r") as f:
        try:
            raw_data = json.load(f)
            for q in raw_data:
                quizzes[q['quizID']] = q
        except Exception:
            pass

def save_quizzes_to_file():
    try:
        with open(DATA_PATH, "w") as f:
            json.dump(list(quizzes.values()), f, indent=4)
    except Exception as e:
        print("Error saving quizzes:", str(e))


@QuizData_blueprint.route('/quiz', methods=['POST'])
def create_quiz():
    data = request.json
    quiz_id = data.get('quizID')

    if not quiz_id:
        return jsonify({"error": "quizID is required"}), 400

    quizzes[quiz_id] = data
    save_quizzes_to_file()

    return jsonify({"message": "Quiz saved successfully", "quiz": data}), 201


@QuizData_blueprint.route('/quiz/<quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    quiz = quizzes.get(quiz_id)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    return jsonify(quiz)


@QuizData_blueprint.route('/quizzes', methods=['GET'])
def get_all_quizzes():
    return jsonify(list(quizzes.values()))

