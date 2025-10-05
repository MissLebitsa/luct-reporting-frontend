import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import CreateReport from "./pages/CreateReport";
import ReportDetails from "./pages/ReportDetails";
import Courses from "./pages/Courses";
import Classes from "./pages/Classes";
import Lectures from "./pages/Lectures";
import Monitoring from "./pages/Monitoring";
import Rating from "./pages/Rating";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/create" element={<CreateReport />} />
        <Route path="/reports/:id" element={<ReportDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;