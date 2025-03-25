import "./App.css";  // Import CSS styles
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/data")
      .then(response => setEmails(Array.isArray(response.data) ? response.data : []))  // Ensure it's an array
      .catch(error => console.error("Error fetching emails:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Valid Email Domains</h1>
      {emails.length === 0 ? <p className="loading-text">Loading or no data found...</p> : 
        <ul className="email-list">
          {emails.map((email, index) => (
            <li key={index} className="email-item">{email}</li>
          ))}
        </ul>
      }
    </div>
  );
}

export default App;
