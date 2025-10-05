import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
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
              Login
            </h2>
            {error && <div className="alert alert-danger" style={{ backgroundColor: "#000", color: "#fff", border: "none" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                Login
              </button>
            </form>
            <div className="mt-3 text-center">
              <a href="/register" style={{ color: "#000", textDecoration: "underline" }}>
                Don't have an account? Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;