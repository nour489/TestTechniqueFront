import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const headerStyle = {
    padding: "20px",
    textAlign: "center",
    background: "#f7f7f7",
  };

  const logoStyle = {
    height: "40px",
    width: "250px",
  };

  return (
    <header style={headerStyle}>
      <img
        src="/logo.jpg"
        alt="Company Logo"
        style={logoStyle}
        onClick={() => navigate("/")}
      />
    </header>
  );
};

export default Header;
