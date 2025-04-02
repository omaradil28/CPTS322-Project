// Attempting to shift teacher.html to a React component
import React from "react";

function TeacherDashboard() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>

      <h2>Classes You Teach</h2>

      <div>
        <h3>Math 101</h3>
        <p>
          <strong>Class Description:</strong> Basic Algebra and Geometry
        </p>

        <h4>Quizzes</h4>
        <ul>
          <li>
            Quiz 1: Algebra Basics <strong>[COMPLETED]</strong>
          </li>
          <li>
            Quiz 2: Geometry Fundamentals <strong>[3 DAYS]</strong>
          </li>
        </ul>

        <h4>Student Responses - Algebra Basics</h4>
        <table border="1">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Score</th>
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Person A</td>
              <td>100%</td>
              <td>A, B, C, D</td>
            </tr>
            <tr>
              <td>Person B</td>
              <td>75%</td>
              <td>A, B, C, D</td>
            </tr>
          </tbody>
        </table>

        <h4>Quiz Statistics</h4>
        <p>
          <strong>Quiz Name:</strong> Algebra Basics
        </p>
        <p>
          <strong>Number of Questions:</strong> 4
        </p>
        <p>
          <strong>Average Score:</strong> 87.5%
        </p>
      </div>

      <hr />

      <div>
        <h3>CPTS 101 - Intro to Computer Science</h3>
        <p>
          <strong>Class Description:</strong> Introduction to Programming
        </p>

        <h4>Quizzes</h4>
        <ul>
          <li>
            Quiz 1: Variables <strong>[COMPLETED]</strong>
          </li>
          <li>
            Quiz 2: If statements <strong>[3 DAYS]</strong>
          </li>
        </ul>

        <h4>Student Responses - Variables</h4>
        <table border="1">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Score</th>
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Person A</td>
              <td>100%</td>
              <td>A, A, B, C</td>
            </tr>
            <tr>
              <td>Person B</td>
              <td>85%</td>
              <td>A, A, B, D</td>
            </tr>
          </tbody>
        </table>

        <h4>Quiz Statistics</h4>
        <p>
          <strong>Quiz Name:</strong> Variables
        </p>
        <p>
          <strong>Number of Questions:</strong> 4
        </p>
        <p>
          <strong>Average Score:</strong> 87.5%
        </p>
      </div>
    </div>
  );
}

export default TeacherDashboard;