from datetime import datetime
from QuizData import QuizData

class Quiz:
    def __init__(self, quizName, quizID, deadline = None, timeQuestion = None, penalty = None):
        self.quizName = quizName
        self.quizID = quizID
        self.questions = []
        self.startTime = None
        self.endTime = None
        if deadline: 
            self.deadline = datetime.strptime(deadline, "%Y-%m-%d %H:%M:%S") 
        self.quizStatus = "unattempted"
        self.timeQuestion = timeQuestion
        self.penalty = penalty
        self.total_penalty = 0

    def addQuestion(self, qType, ques, answers, correct, points, fb):
        qDataID = len(self.questions) + 1
        question = QuizData(self.quizID, qType, qDataID, ques, answers, correct, points, fb)
        self.questions.append(question)

    def runQuiz(self):
        self.start_time = datetime.now()
        print(f"\nStarting {self.quizName}: ")
        if self.timeQuestion:
            print(f"\nYou have {self.timeQuestion} for each question ")

        for question in self.questions:
            # display question
            print(f"\nQuestion {question.quizDataID}.")
            question.display_question()

            # get response
            questionStart = datetime.now()
            user_input = input("Enter your answer number: ")
            question.get_response(user_input)
            questionEnd = datetime.now()

            elapse = (questionEnd - questionStart).total_seconds()
            is_correct = question.check_answer()

            if self.timeQuestion and elapse > self.timeQuestion and is_correct:
                    penalty_amount = question.get_point_value() * (self.penalty / 100)
                    print(f"You went over the allotted question time")
                    print(f"A penalty of {penalty_amount:.2f} will be applied.")
                    self.total_penalty += penalty_amount
               
            # check answer
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
        total_score = 0

        for q in self.questions:
            if q.check_answer():
                total_score += q.get_point_value()
        
        total_score = max(0, total_score - self.total_penalty)

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
        
        time_input = input("Enter the allowed time per question in seconds, if there is no limit enter nothing: ")
        self.timeQuestion = float(time_input) if time_input else None

        if self.timeQuestion:
            penalty_input = input("Enter the penalty percentage (ex 5 = 5%) : ")
            self.penalty = float(penalty_input) if penalty_input else 0

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
