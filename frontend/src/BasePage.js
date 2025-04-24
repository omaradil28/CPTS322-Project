import React from "react";
import "./Base.css";

function BasePage({ children }) {
  const profession = sessionStorage.getItem("profession");
  console.log("Profession from sessionStorage:", profession);
  return (
    <div className="base-page">
      <header className="header">
        <nav>
          {!profession && (
            <>
              <a href="/login">Login</a>
              <a href="/create-account">Create Account</a>
            </>
          )}

          {profession === "Student" && (
            <>
              <a href="/student">Student Dashboard</a>
              <button
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </>
          )}

          {profession === "Instructor" && (
            <>
              <a href="/teacher">Teacher Dashboard</a>
              <button
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
      <main className="content">{children}</main>
      <footer className="footer">
        <p>CPTS 322 Group Project</p>
      </footer>
    </div>
  );
}

export default BasePage;
