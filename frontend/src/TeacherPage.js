import React, { useState, useEffect } from "react";
import BasePage from "./BasePage";

function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem("quizzes");
    return saved ? JSON.parse(saved) : [];
  });
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", possibleAnswers: ["", "", "", ""], correctAnswer: "" },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("quizzes");
    if (saved) setQuizzes(JSON.parse(saved));
  }, []);
  
  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const handleAddQuestion = () =>
    setQuestions([...questions, { text: "", possibleAnswers: ["", "", "", ""], correctAnswer: "" }]);

  const handleQuestionChange = (i, field, val) => {
    const updated = [...questions];
    updated[i][field] = val;
    setQuestions(updated);
  };

  const handleAnswerChange = (qi, ai, val) => {
    const updated = [...questions];
    updated[qi].possibleAnswers[ai] = val;
    setQuestions(updated);
  };

  const handleCreateQuiz = () => {
    const newQuiz = {
      name: quizName.trim(),
      description: quizDescription.trim(),
      questions: questions.filter((q) => q.text.trim()),
    };
    setQuizzes([...quizzes, newQuiz]);
    setQuizName("");
    setQuizDescription("");
    setQuestions([{ text: "", possibleAnswers: ["", "", "", ""], correctAnswer: "" }]);
  };

  return (
    <BasePage>
      <h1>Teacher Dashboard</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleCreateQuiz(); }}>
        <h2>Create a New Quiz</h2>

        <input
          type="text"
          placeholder="Quiz Name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          required
        />
        <br />

        <textarea
          placeholder="Quiz Description"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          required
          rows={2}
        />
        <br /><br />

        {questions.map((q, qi) => (
          <fieldset key={qi} style={{ marginBottom: "1em" }}>
            <legend>Question {qi + 1}</legend>
            <input
              type="text"
              placeholder="Question text"
              value={q.text}
              onChange={(e) => handleQuestionChange(qi, "text", e.target.value)}
              required
            />
            <br />
            {q.possibleAnswers.map((ans, ai) => (
              <input
                key={ai}
                type="text"
                placeholder={`Answer ${ai + 1}`}
                value={ans}
                onChange={(e) => handleAnswerChange(qi, ai, e.target.value)}
                required
                style={{ marginRight: "5px" }}
              />
            ))}
            <br />
            <input
              type="text"
              placeholder="Correct answer"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(qi, "correctAnswer", e.target.value)}
              required
            />
          </fieldset>
        ))}

        <button type="button" onClick={handleAddQuestion}>+ Add Question</button>
        <br /><br />
        <button type="submit">Create Quiz</button>
      </form>

      <hr />

      <h2>Quizzes</h2>
      {quizzes.map((quiz, qi) => (
        <details key={qi} style={{ marginBottom: "1em" }}>
          <summary><strong>{quiz.name}</strong> - {quiz.description}</summary>
          {quiz.questions.map((q, i) => (
            <div key={i} style={{ marginLeft: "1em" }}>
              <p><strong>Q{i + 1}:</strong> {q.text}</p>
              <ul>
                {q.possibleAnswers.map((a, j) => (
                  <li key={j}>{a}</li>
                ))}
              </ul>
              <p><em>Correct Answer:</em> {q.correctAnswer}</p>
            </div>
          ))}
        </details>
      ))}
    </BasePage>
  );
}

export default TeacherDashboard;
