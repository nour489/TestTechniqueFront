import React from "react";

const HeroSection = () => {
  const heroStyle = {
    backgroundImage: `url('/hero-bg.jpg')`, // Adjust the path based on your file location
    backgroundSize: "cover", // Ensures the image covers the entire section
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents repeating
    height: "400px", // Adjust the height as needed
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff", // Text color to contrast with the image
    textAlign: "center",
    padding: "20px",
  };
  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // White with transparency
    padding: "20px 40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
    maxWidth: "600px",
  };

  const headingStyle = {
    color: "#000", // Black text
    marginBottom: "10px",
  };

  const paragraphStyle = {
    color: "#000", // Black text
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    background: "#ff69b4",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
  };
  return (
    <section style={heroStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Improve your skills on your own</h2>
        <p style={paragraphStyle}>To prepare for a better future</p>
        <button style={buttonStyle}>REGISTER NOW</button>
      </div>
    </section>
  );
};

export default HeroSection;
