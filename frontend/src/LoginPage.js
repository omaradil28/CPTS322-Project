import React, { useState } from "react";
import BasePage from "./BasePage";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to store error or success messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setMessage(data.message); // Display success message
      } else {
        // Login failed
        setMessage(data.error); // Display error message from backend
      }
    } catch (error) {
      // Handle network or other errors
      setMessage("An error occurred while connecting to the server.");
      console.error("Error:", error);
    }
  };

  return (
    <BasePage>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} {/* Display the message */}
    </BasePage>
  );
}

export default LoginPage;