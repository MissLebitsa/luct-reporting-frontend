import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login"); 
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#000" }}
    >
      <div className="col-12 col-md-4">
        <div className="card shadow" style={{ backgroundColor: "#fff", color: "#000" }}>
          <div className="card-body">
            <h2 className="mb-4 text-center" style={{ color: "#000" }}>
              Register
            </h2>
            {error && (
              <div
                className="alert alert-danger"
                style={{ backgroundColor: "#000", color: "#fff", border: "none" }}
              >
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                />
              </div>
              <div className="mb-3">
                <select
                  name="role"
                  className="form-select"
                  value={form.role}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="prl">Principal Lecturer</option>
                  <option value="pl">Program Leader</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                Register
              </button>
            </form>
            <div className="mt-3 text-center">
              <a href="/login" style={{ color: "#000", textDecoration: "underline" }}>
                Already have an account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;