import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TakeQuiz() {
    const { quizID } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5001/quiz/${quizID}`)
            .then((res) => res.json())
            .then((data) => setQuiz(data))
            .catch((err) => console.error("Failed to load quiz:", err));
    }, [quizID]);

    const handleSelect = (qIndex, answer) => {
        setAnswers((prev) => ({ ...prev, [qIndex]: answer }));
    };

    const handleSubmit = () => {
        const stored = JSON.parse(sessionStorage.getItem("userData")) || {};
        const completed = stored.completedQuizzes || [];

        if (!completed.includes(quizID)) {
            completed.push(quizID);
        }

        sessionStorage.setItem(
            "userData",
            JSON.stringify({ ...stored, completedQuizzes: completed })
        );

        // Calculate the score
        let calculatedScore = 0;
        quiz.questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) {
                calculatedScore += 1;
            }
        });

        setScore(calculatedScore);
        setSubmitted(true);
    };

    if (!quiz || !quiz.questions) return <p>Loading quiz...</p>;

    return (
        <div>
            <h1>{quiz.name}</h1>
            <p><strong>Description:</strong> {quiz.description}</p>
            {quiz.questions.map((q, i) => (
                <div key={i}>
                    <p>{q.text}</p>
                    {q.possibleAnswers.map((a, j) => (
                    <label key={j}>
                        <input
                        type="radio"
                        name={`question-${i}`} // ✅ ensures each question is isolated
                        value={a}
                        checked={answers[i] === a}
                        onChange={() => handleSelect(i, a)}
                        />
                        {a}
                    </label>
                    ))}
                </div>
            ))}
            {!submitted ? (
                <button onClick={handleSubmit}>Submit Quiz</button>
            ) : (
                <div>
                    <p><strong>Quiz submitted successfully!</strong></p>
                    <p><strong>Your Score:</strong> {score} / {quiz.questions.length}</p>
                    <button onClick={() => navigate("/student")}>Back to Dashboard</button>
                </div>
            )}
        </div>
    );
}

export default TakeQuiz;
