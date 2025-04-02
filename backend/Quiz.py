from datetime import datetime
from QuizData import QuizData

class Quiz:
    def __init__(self, quizName, quizID, deadline = None):
        self.quizName = quizName
        self.quizID = quizID
        self.questions = []
        self.startTime = None
        self.endTime = None
        if deadline: 
            self.deadline = datetime.strptime(deadline, "%Y-%m-%d %H:%M:%S") 
        else:
            None
        self.quizStatus = "unattempted"

    def addQuestion(self, qType, ques, answers, correct, points, fb):
        qDataID = len(self.questions) + 1
        question = QuizData(self.quizID, qType, qDataID, ques, answers, correct, points, fb)
        self.questions.append(question)

    def runQuiz(self):
        self.start_time = datetime.now()
        print(f"\nStarting {self.quizName}: ")

        for question in self.questions:
            # display question
            print(f"\nQuestion {question.quizDataID}.")
            question.display_question()

            # get response
            user_input = input("Enter your answer number: ")
            question.get_response(user_input)

            # check answer
            is_correct = question.check_answer()
            print("\nResults")
            print(f"Your answer: {question.get_your_answer()}")
            print(f"Correct answer: {question.get_correct_answer()}")
            print("Correct!" if is_correct else "Incorrect.")

            # show feedback
            print("\nFeedback")
            print(question.get_feedback())

        self.end_time = datetime.now()
        if self.deadline:
            if self.end_time > self.deadline:
                self.submission_status = "Late" 
            else:
                self.submission_status = "On Time"
        else:
            self.submission_status = "No Deadline"

    def grade_quiz(self):
        total_score = sum(q.get_point_value() if q.check_answer() else 0 for q in self.questions)
        max_score = sum(q.get_point_value() for q in self.questions)

        print(f"\n{self.quizName} Results ")
        print(f"Score: {total_score}/{max_score} ({(total_score / max_score) * 100:.2f}%)")
        print(f"Submission Status: {self.submission_status}")

    def createQuiz(self):
        self.quizName = input("Enter a quiz name: ")
        self.quizID = input("Enter a unique quiz id: ")
        self.deadline = input("If you have a deadline enter it here (YYYY-MM-DD HH:MM:SS). If not enter nothing.")
        
        if self.deadline:
            self.deadline = datetime.strptime(self.deadline, "%Y-%m-%d %H:%M:%S")
        else:
            self.deadline = None
        

        quesNum = int(input("How many questions are in this quiz?: "))
        
        for i in range(quesNum):
            print(f"\nQuestion {i + 1}:")
            type = ""
            while type not in ["Multiple", "Free", "Poll"]:
                type = input("Enter Question type (Multiple, Free, Poll): ")
            ques = input("Enter Question: ")
            if type in ["Multiple", "Poll"]:
                choices = []
                ansNum = int(input("How many choices are in this question: "))
                for a in range(ansNum):
                    choices.append(input(f"Enter choice {a + 1}: "))
                cAnsN = int(input("What is the correct answer number: "))
                cAns = choices[cAnsN - 1]
            if type in ["Free"]:
                choices = []
                cAns = input("What is answer: ")
            points = int(input("How many points is this question worth: "))
            feedb = input("What feedback would you like to give for this question: ")
            self.addQuestion(type, ques, choices, cAns, points, feedb)