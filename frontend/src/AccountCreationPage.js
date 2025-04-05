import React, { useState } from "react";
import BasePage from "./BasePage";

function CreateAccountPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profession, setProfession] = useState("Student");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirmPassword,
          profession,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "An unknown error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred while connecting to the server.");
    }
  };

  return (
    <BasePage>
      <h1>Create Account</h1>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Profession:</label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
          </select>
        </div>
        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </BasePage>
  );
}

export default CreateAccountPage;