import React, { useState, useEffect } from "react";
import BasePage from "./BasePage";
import axios from "axios";
import { useLocation } from "react-router-dom";

function TeacherDashboard() {
  const location = useLocation();
  const [quizzes, setQuizzes] = useState([]);
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", possibleAnswers: ["", "", "", ""], correctAnswer: "" },
  ]);

  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const username = location.state?.username;

  useEffect(() => {
    axios.get("http://localhost:5001/quizzes")
      .then(res => {
        const filteredQuizzes = res.data.filter(quiz => quiz.creator === username);
        setQuizzes(filteredQuizzes);
        const uniqueClasses = [...new Set(filteredQuizzes.map(q => q.className))];
        setClasses(uniqueClasses);
      })
      .catch(err => console.error("Error loading quizzes:", err));
  }, [username]);

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
    if (!selectedClass) {
      alert("Please select or create a class first.");
      return;
    }

    const quizID = `quiz-${Date.now()}`;
    const newQuiz = {
      quizID,
      name: quizName.trim(),
      description: quizDescription.trim(),
      creator: username,
      className: selectedClass,
      questions: questions.filter((q) => q.text.trim()),
    };

    axios.post("http://localhost:5001/quiz", newQuiz)
      .then(res => {
        setQuizzes([...quizzes, res.data.quiz]);
        setQuizName("");
        setQuizDescription("");
        setQuestions([{ text: "", possibleAnswers: ["", "", "", ""], correctAnswer: "" }]);
        if (!classes.includes(selectedClass)) {
          setClasses([...classes, selectedClass]);
        }
      })
      .catch(err => console.error("Error saving quiz:", err));
  };

  const handleDeleteQuiz = (quizID) => {
    axios.delete(`http://localhost:5001/quiz/${quizID}`)
      .then(() => {
        setQuizzes(quizzes.filter(quiz => quiz.quizID !== quizID));
      })
      .catch(err => console.error("Error deleting quiz:", err));
  };

  const handleAddClass = () => {
    if (className.trim() && !classes.includes(className.trim())) {
      setClasses([...classes, className.trim()]);
      setSelectedClass(className.trim());
      setClassName("");
    }
  };

  return (
    <BasePage>
      <h1>Teacher Dashboard</h1>
      {username && <p>Welcome, {username}!</p>}

      <div style={{ marginBottom: "1em" }}>
        <h2>Classes</h2>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Select a Class --</option>
          {classes.map((cls, i) => (
            <option key={i} value={cls}>{cls}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="New Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={handleAddClass}>Add Class</button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleCreateQuiz(); }}>
        <h2>Create a New Quiz {selectedClass && `for ${selectedClass}`}</h2>

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

      <h2>Your Quizzes</h2>
      {classes.length > 0 ? (
        classes.map((cls, i) => {
          const quizzesForClass = quizzes.filter(q => q.className === cls);
          return (
            <div key={i} style={{ marginBottom: "2em" }}>
              <h3>{cls}</h3>
              {quizzesForClass.length > 0 ? (
                quizzesForClass.map((quiz, qi) => (
                  <details key={qi} style={{ marginBottom: "1em" }}>
                    <summary>
                      <strong>{quiz.name}</strong> - {quiz.description}
                    </summary>
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
                    <button onClick={() => handleDeleteQuiz(quiz.quizID)}>Delete Quiz</button>
                  </details>
                ))
              ) : (
                <p>No quizzes for this class yet.</p>
              )}
            </div>
          );
        })
      ) : (
        <p>No classes found.</p>
      )}
    </BasePage>
  );
}

export default TeacherDashboard;