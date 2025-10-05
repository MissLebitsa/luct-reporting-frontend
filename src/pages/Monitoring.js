import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Monitoring = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || role !== "student") {
      setLoading(false);
      return;
    }
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/monitoring", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        setError("Failed to load monitoring data.");
      }
      setLoading(false);
    };
    fetchStats();
  }, [token, role]);

  if (!token || role !== "student") {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#000" }}>
        <div className="col-12 col-md-8">
          <div className="card shadow" style={{ backgroundColor: "#fff", color: "#000" }}>
            <div className="card-body text-center">
              <h2>Access Denied</h2>
              <p>You must be logged in as a student to view this page.</p>
              <Link
                to="/dashboard"
                className="btn mt-3"
                style={{ backgroundColor: "#000", color: "#fff", width: "200px" }}
              >
                Go Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#000" }}>
      <div className="col-12 col-md-8">
        <div className="card shadow" style={{ backgroundColor: "#fff", color: "#000" }}>
          <div className="card-body text-center">
            <h2>Monitoring</h2>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert alert-danger mb-4" style={{ backgroundColor: "#000", color: "#fff", border: "none" }}>
                {error}
              </div>
            ) : stats ? (
              <div>
                <h4 className="mt-3">Attendance</h4>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{stats.attendance}%</p>
                <h4 className="mt-3">Average Grade</h4>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{stats.averageGrade}</p>
                <h4 className="mt-3">Completed Modules</h4>
                <ul>
                  {stats.completedModules.map((mod, i) => (
                    <li key={i}>{mod}</li>
                  ))}
                </ul>
                <h4 className="mt-3">Overall Progress</h4>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{stats.progress}%</p>
              </div>
            ) : (
              <p>No monitoring data available.</p>
            )}
            <Link
              to="/dashboard"
              className="btn mt-4"
              style={{ backgroundColor: "#000", color: "#fff", width: "200px" }}
            >
              Go Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;