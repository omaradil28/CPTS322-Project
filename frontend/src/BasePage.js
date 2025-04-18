import React from "react";
import "./Base.css"; // Import global CSS

function BasePage({ children }) {
  return (
    <div className="base-page">
      <header className="header">
        <nav>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/create-account">Create Account</a>
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