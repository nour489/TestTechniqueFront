import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Courses from "./components/CoursesSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import CoursesTable from "./components/CoursesTable"; // New table component

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Courses />
              <ContactForm />
            </>
          }
        />
        <Route path="/all-courses" element={<CoursesTable />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
