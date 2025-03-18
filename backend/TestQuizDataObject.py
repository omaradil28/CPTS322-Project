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

    def display_question(self):
        print(self.question)
        if self.quizType in ["Multiple", "Poll"]:
            for i, answer in enumerate(self.possibleAnswers, start=1):
                print(f"{i}) {answer}")

    def get_response(self, user_input=None):
        if self.quizType in ["Multiple", "Poll"]:
            try:
                ua = int(user_input) if user_input is not None else int(input("Enter your answer number: "))
                if 1 <= ua <= len(self.possibleAnswers):
                    self.yourAnswer = self.possibleAnswers[ua - 1]
                else:
                    print("You have entered an invalid response. Please try again.")
                    self.get_response()
            except ValueError:
                print("Invalid input. Please enter a number.")
                self.get_response()
        elif self.quizType == "Free":
            self.yourAnswer = user_input.strip() if user_input is not None else input("Enter your answer: ").strip()

    def check_answer(self):
        if self.quizType in ["Multiple", "Free"]:
            return self.yourAnswer == self.correctAnswer
        elif self.quizType == "Poll":
            return self.yourAnswer != "Blank"

    # Getters
    def get_quiz_id(self):
        return self.quizID

    def get_quiz_type(self):
        return self.quizType

    def get_quiz_data_id(self):
        return self.quizDataID

    def get_question(self):
        return self.question

    def get_possible_answers(self):
        return self.possibleAnswers

    def get_correct_answer(self):
        return self.correctAnswer

    def get_point_value(self):
        return self.pointValue

    def get_feedback(self):
        return self.feedback

    def get_your_answer(self):
        return self.yourAnswer

    # Setters
    def set_quiz_id(self, qID):
        self.quizID = qID

    def set_quiz_type(self, qType):
        self.quizType = qType

    def set_quiz_data_id(self, qDataID):
        self.quizDataID = qDataID

    def set_question(self, ques):
        self.question = ques

    def set_possible_answers(self, answers):
        self.possibleAnswers = answers

    def set_correct_answer(self, correct):
        self.correctAnswer = correct

    def set_point_value(self, points):
        self.pointValue = points

    def set_feedback(self, fb):
        self.feedback = fb

    def set_your_answer(self, answer):
        self.yourAnswer = answer


def main():
    # Initialize a test quiz question
    quiz = QuizData(
        qID = 1,
        qType = "Multiple",
        qDataID = 1,
        ques = "What is 1 + 1?",
        answers = ["1", "2", "3", "4"],
        correct = "2",
        points = 2,
        fb = "If you take 1 + 1 the result will become 2."
    )

    # Display question
    print("\nDisplaying Quiz Question : ")
    quiz.display_question()

    # Get user response 
    user_input = input("Enter your answer number: ")
    quiz.get_response(user_input)

    # Check answer
    is_correct = quiz.check_answer()
    print("\nShow Answer Result : ")
    print(f"Your answer: {quiz.get_your_answer()}")
    print(f"Correct answer: {quiz.get_correct_answer()}")
    print("Correct!" if is_correct else "Incorrect.")
    
    # Show feedback
    print("\nShow Feedback : ")
    print(quiz.get_feedback())

if __name__ == "__main__":
    main()
