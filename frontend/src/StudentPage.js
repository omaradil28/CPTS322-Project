import React from "react";
import BasePage from "./BasePage";

function StudentPage() {
  return (
    <BasePage>
      <h1>Student Dashboard</h1>

      <h2>Your Enrolled Classes - Person A</h2>

      <div>
        <h3>Math 101</h3>
        <p>
          <strong>Class Description:</strong> Basic Algebra and Geometry
        </p>

        <h4>Available Quizzes</h4>
        <ul>
          <li>
            <a href="#">Quiz 1: Algebra Basics</a> <strong>[COMPLETED]</strong>
          </li>
          <li>
            <a href="#">Quiz 2: Geometry Fundamentals</a> <strong>[3 DAYS]</strong>
          </li>
        </ul>

        <h4>Completed Quizzes</h4>
        <ul>
          <li>Quiz 1: Algebra Basics - Score: 100%</li>
        </ul>
      </div>

      <hr />

      <div>
        <h3>CPTS 101 - Intro to Computer Science</h3>
        <p>
          <strong>Class Description:</strong> Introduction to Programming and
          Computer Science Concepts
        </p>

        <h4>Available Quizzes</h4>
        <ul>
          <li>
            <a href="#">Quiz 1: Basics of Programming</a>{" "}
            <strong>[COMPLETED]</strong>
          </li>
          <li>
            <a href="#">Quiz 2: Data Structures</a> <strong>[3 DAYS]</strong>
          </li>
        </ul>

        <h4>Completed Quizzes</h4>
        <ul>
          <li>Quiz 1: Basics of Programming - Score: 100%</li>
        </ul>
      </div>
    </BasePage>
  );
}

export default StudentPage;