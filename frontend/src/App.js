import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeacherDashboard from "./TeacherPage";
import StudentPage from "./StudentPage"; // Correct path
import LoginPage from "./LoginPage";     // Correct path

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Links */}
        <nav>
          <Link to="/">Home</Link> | <Link to="/teacher">Teacher Page</Link> |{" "}
          <Link to="/student">Student Page</Link> | <Link to="/login">Login</Link>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>Select a page to navigate:</p>
      <div>
        <Link to="/teacher">
          <button>Go to Teacher Page</button>
        </Link>
        <Link to="/student">
          <button>Go to Student Page</button>
        </Link>
        <Link to="/login">
          <button>Go to Login Page</button>
        </Link>
      </div>
    </div>
  );
}

export default App;