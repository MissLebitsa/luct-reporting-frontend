import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Classes = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (role !== "lecturer") return;
    const fetchClasses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/classes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
      } catch (err) {
        setError("Failed to fetch classes.");
      }
    };
    fetchClasses();
  }, [token, role]);

  return (
    <div className="container-fluid min-vh-100 py-5" style={{ backgroundColor: "#000" }}>
      <div className="col-12 col-lg-10 mx-auto">
        <div className="card" style={{ backgroundColor: "#fff", color: "#000" }}>
          <div className="card-body">
            <h2 className="mb-4 text-center" style={{ color: "#000" }}>Classes</h2>
            {error && <div className="alert alert-danger" style={{ backgroundColor: "#000", color: "#fff" }}>{error}</div>}
            <table className="table table-bordered">
              <thead style={{ backgroundColor: "#000", color: "#fff" }}>
                <tr>
                  <th>Class Name</th>
                  <th>Venue</th>
                  <th>Schedule</th>
                </tr>
              </thead>
              <tbody>
                {classes.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">No classes found.</td>
                  </tr>
                ) : (
                  classes.map(cls => (
                    <tr key={cls.id}>
                      <td>{cls.name}</td>
                      <td>{cls.venue}</td>
                      <td>{cls.schedule}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="text-center mt-4">
              <Link
                to="/dashboard"
                className="btn"
                style={{ backgroundColor: "#000", color: "#fff", width: "200px" }}
              >
                Go Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;