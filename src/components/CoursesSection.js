import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "10px 20px",
    background: "#ff69b4",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
  };

  // Fetch courses from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/item/courses") // Adjust this URL if needed
      .then((response) => {
        // Sort courses by timestamp and get the latest 6
        const latestCourses = response.data
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 6);
        setCourses(latestCourses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <section style={{ padding: "50px", background: "#f0f8ff" }}>
      <h2 style={{ textAlign: "center" }}>
        Discover Our Courses{" "}
        <button style={buttonStyle} onClick={() => navigate("/all-courses")}>
          View More
        </button>
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {courses.map((course, index) => (
          <div
            key={index}
            style={{
              margin: "10px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "200px", // Adjust width for consistency
              textAlign: "center", // Center-align content
              background: "#fff", // Add background color
            }}
          >
            <img
              src={course.image || "/logo.jpg"} // Fallback to a default image if no image is provided
              alt={course.title}
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            />
            <h3>{course.title}</h3>
            <p>{course.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
