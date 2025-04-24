import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasePage from "./BasePage";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); 

        if (data.profession === "Student") {
          navigate("/student", { state: { username } });
        } else if (data.profession === "Instructor") {
          navigate("/teacher", { state: { username } }); 
        } else {
          setMessage("Unknown profession.");
        }
      } else {
        setMessage(data.error); 
      }
    } catch (error) {
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
      {message && <p>{message}</p>} {}
    </BasePage>
  );
}

export default LoginPage;
