import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeacherDashboard from "./TeacherPage";
import StudentPage from "./StudentPage";
import LoginPage from "./LoginPage";
import CreateAccountPage from "./AccountCreationPage";
import TakeQuiz from "./TakeQuiz";
import BasePage from "./BasePage"; // Import BasePage

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/take-quiz/:quizID" element={<TakeQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <BasePage>
      <h1>Welcome to ClassRespond</h1>
      <p>Select a page to navigate:</p>
      <div>
        <Link to="/login">
          <button>Go to Login Page</button>
        </Link>
        <Link to="/create-account">
          <button>Create an Account</button>
        </Link>
      </div>
    </BasePage>
  );
}

export default App;