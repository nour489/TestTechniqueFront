import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    alert(`${formData.name} said: ${formData.message}`);
  };

  return (
    <section
      style={{
        padding: "50px",
        background: "orange", // Orange background
        borderRadius: "15px", // Curved corners
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: add a subtle shadow for depth
        maxWidth: "500px", // You can adjust the max width to your preference
        margin: "auto", // Centers the form horizontally
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            borderRadius: "5px", // Rounded corners for inputs
            border: "1px solid #ccc",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            borderRadius: "5px", // Rounded corners for inputs
            border: "1px solid #ccc",
          }}
        />
        <textarea
          name="message"
          placeholder="Write your message here"
          value={formData.message}
          onChange={handleChange}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            borderRadius: "5px", // Rounded corners for textarea
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#ff69b4", // Pink button color
            border: "none",
            color: "#fff",
            borderRadius: "5px", // Rounded corners for the button
            cursor: "pointer",
          }}
        >
          Send the message
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
