import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateReport = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    faculty_name: "",
    class_name: "",
    week_of_reporting: "",
    date_of_lecture: "",
    course_name: "",
    course_code: "",
    lecturer_name: "",
    actual_students_present: "",
    total_registered_students: "",
    venue: "",
    scheduled_time: "",
    topic_taught: "",
    learning_outcomes: "",
    lecturer_recommendations: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!token || role !== "lecturer") {
      navigate("/login");
    }
  }, [token, role, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/reports", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Report submitted successfully!");
      setForm({
        faculty_name: "",
        class_name: "",
        week_of_reporting: "",
        date_of_lecture: "",
        course_name: "",
        course_code: "",
        lecturer_name: "",
        actual_students_present: "",
        total_registered_students: "",
        venue: "",
        scheduled_time: "",
        topic_taught: "",
        learning_outcomes: "",
        lecturer_recommendations: "",
      });
      setTimeout(() => {
        setSuccess("");
        navigate("/reports");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit report");
    }
    setLoading(false);
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#000" }}
    >
      <div className="col-12 col-md-8">
        <div className="card shadow" style={{ backgroundColor: "#fff", color: "#000" }}>
          <div className="card-body">
            <h2 className="mb-4 text-center" style={{ color: "#000" }}>Create Report</h2>
            {error && (
              <div className="alert alert-danger" style={{ backgroundColor: "#000", color: "#fff", border: "none" }}>
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success text-center" style={{ backgroundColor: "#000", color: "#fff", border: "none" }}>
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {Object.keys(form).map((key) => (
                <div className="mb-3" key={key}>
                  <input
                    type={key.includes("date") ? "date" : "text"}
                    name={key}
                    className="form-control"
                    placeholder={key.replace(/_/g, " ").toUpperCase()}
                    value={form[key]}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                  />
                </div>
              ))}
              <button type="submit" className="btn w-100" style={{ backgroundColor: "#000", color: "#fff" }} disabled={loading}>
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;