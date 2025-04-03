from flask import Blueprint, request, jsonify  # Ensure Flask is installed: pip install flask
# Removed unused imports

QuizData_blueprint = Blueprint('quiz', __name__)

quiz_blueprint = Blueprint('quiz', __name__)  # Corrected variable name
quizzes = {}

class QuizData:
    def __init__(self, qID, qType, qDataID, ques, answers, correct, points, fb):
        self.quizID = qID
        self.quizType = qType
        self.quizDataID = qDataID
        self.question = ques
        self.possibleAnswers = answers
        self.correctAnswer = correct
        self.pointValue = points
        self.feedback = fb
        self.yourAnswer = "Blank"

    def to_dict(self):
        return {
            "quizID": self.quizID,
            "quizType": self.quizType,
            "quizDataID": self.quizDataID,
            "question": self.question,
            "possibleAnswers": self.possibleAnswers,
            "correctAnswer": self.correctAnswer,
            "pointValue": self.pointValue,
            "feedback": self.feedback,
            "yourAnswer": self.yourAnswer,
        }

    def get_response(self, user_input):
        if self.quizType in ["Multiple", "Poll"]:
            try:
                ua = int(user_input)
                if 1 <= ua <= len(self.possibleAnswers):
                    self.yourAnswer = self.possibleAnswers[ua - 1]
                else:
                    return "Invalid response. Out of range."
            except ValueError:
                return "Invalid input. Please enter a number."
        elif self.quizType == "Free":
            self.yourAnswer = user_input.strip()
        return "Response recorded."

    def check_answer(self):
        if self.quizType in ["Multiple", "Free"]:
            return self.yourAnswer == self.correctAnswer
        elif self.quizType == "Poll":
            return self.yourAnswer != "Blank"

# Routes
@quiz_blueprint.route('/quiz', methods=['POST'])
def create_quiz():
    data = request.json
    quiz = QuizData(
        qID=data['quizID'],
        qType=data['quizType'],
        qDataID=data['quizDataID'],
        ques=data['question'],
        answers=data['possibleAnswers'],
        correct=data['correctAnswer'],
        points=data['pointValue'],
        fb=data['feedback']
    )
    quizzes[data['quizID']] = quiz
    return jsonify({"message": "Quiz created successfully", "quiz": quiz.to_dict()}), 201

@quiz_blueprint.route('/quiz/<quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    quiz = quizzes.get(quiz_id)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    return jsonify(quiz.to_dict())

@quiz_blueprint.route('/quiz/<quiz_id>/response', methods=['POST'])
def submit_response(quiz_id):
    quiz = quizzes.get(quiz_id)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    user_input = request.json.get('response')
    message = quiz.get_response(user_input)
    return jsonify({"message": message, "quiz": quiz.to_dict()})

@quiz_blueprint.route('/quiz/<quiz_id>/check', methods=['GET'])
def check_answer(quiz_id):
    quiz = quizzes.get(quiz_id)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    is_correct = quiz.check_answer()
    return jsonify({"correct": is_correct, "feedback": quiz.feedback})
