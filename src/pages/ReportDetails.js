import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ReportDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchReport = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reports/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReport(res.data);
      } catch (err) {
        setError("Failed to fetch report details.");
      }
    };
    fetchReport();
  }, [id, token, navigate]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackSuccess("");
    try {
      await axios.put(
        `http://localhost:5000/api/reports/${id}/feedback`,
        { prl_feedback: feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedbackSuccess("Feedback submitted!");
      setFeedback("");
    } catch (err) {
      setFeedbackSuccess("Failed to submit feedback.");
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#000" }}
    >
      <div className="col-12 col-md-8">
        <div className="card shadow" style={{ backgroundColor: "#fff", color: "#000" }}>
          <div className="card-body">
            <h2 className="mb-4 text-center" style={{ color: "#000" }}>Report Details</h2>
            {error && <div className="alert alert-danger" style={{ backgroundColor: "#000", color: "#fff", border: "none" }}>{error}</div>}
            {!report ? (
              <div>Loading...</div>
            ) : (
              <>
                <table className="table table-bordered" style={{ backgroundColor: "#fff", color: "#000" }}>
                  <tbody>
                    {Object.keys(report).map((key) => (
                      <tr key={key}>
                        <th style={{ backgroundColor: "#000", color: "#fff", width: "40%" }}>{key.replace(/_/g, " ").toUpperCase()}</th>
                        <td>{report[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {role === "prl" && (
                  <form onSubmit={handleFeedbackSubmit} className="mt-4">
                    <h5 style={{ color: "#000" }}>Add Feedback</h5>
                    <textarea
                      className="form-control mb-2"
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                      required
                      style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                    />
                    <button type="submit" className="btn" style={{ backgroundColor: "#000", color: "#fff" }}>
                      Submit Feedback
                    </button>
                    {feedbackSuccess && (
                      <div className="mt-2 text-center" style={{ color: feedbackSuccess === "Feedback submitted!" ? "#28a745" : "#dc3545" }}>
                        {feedbackSuccess}
                      </div>
                    )}
                  </form>
                )}
              </>
            )}
            <div className="mt-3 text-center">
              <Link
                to="/reports"
                className="btn"
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                Back to Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;