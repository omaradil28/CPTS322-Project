import React, { useState, useEffect } from "react";
import BasePage from "./BasePage";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [className, setClassName] = useState("");
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    fetch("http://localhost:5001/quizzes")
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
    
    const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
    const stored = JSON.parse(localStorage.getItem("userData")) || {};
    setEnrolledClasses(stored.enrolledClasses || []);
    setCompletedQuizzes(userData.completedQuizzes || []);
  }, []);

  const handleEnroll = () => {
    const trimmed = className.trim();
    if (trimmed && !enrolledClasses.includes(trimmed)) {
      const updatedClasses = [...enrolledClasses, trimmed];
      setEnrolledClasses(updatedClasses);
  
      const stored = JSON.parse(localStorage.getItem("userData")) || {};
      const updatedUserData = {
        ...stored,
        enrolledClasses: updatedClasses
      };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    setClassName("");
  };

  const availableQuizzes = quizzes.filter(
    (q) => enrolledClasses.includes(q.className) && !completedQuizzes.includes(q.quizID)
  );

  return (
    <BasePage>
      <h1>Welcome, {username}!</h1>

      <div>
        <h2>Enroll in a Class</h2>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter Class Name"
        />
        <button onClick={handleEnroll}>Enroll</button>
      </div>

      {enrolledClasses.length > 0 && (
        <div>
          <h2>Enrolled Classes</h2>
          <ul>
          {enrolledClasses.map((cls, idx) => (
            <li key={idx}>{cls}</li>
          ))}
          </ul>
          {availableQuizzes.length === 0 ? (
            <p>No quizzes available or you've completed them all!</p>
          ) : (
            availableQuizzes.map((quiz) => (
              <div key={quiz.quizID}>
                <h3>{quiz.name}</h3>
                <p><strong>Class:</strong> {quiz.className}</p>
                <p>{quiz.description}</p>
                <button onClick={() => navigate(`/take-quiz/${quiz.quizID}`)}>
                  Take Quiz
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </BasePage>
  );
}

export default StudentDashboard;
