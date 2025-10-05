import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#000" }}
    >
      <div className="col-12 col-md-6">
        <div className="card shadow" style={{ backgroundColor: "#fff", color: "#000" }}>
          <div className="card-body text-center">
            <h2 style={{ color: "#000" }}>Dashboard</h2>
            <p style={{ color: "#000" }}>
              {token && role === "student"
                ? "Welcome! You are logged in as student."
                : token && role === "lecturer"
                ? "Welcome! You are logged in as lecturer."
                : token && role === "prl"
                ? "Welcome! You are logged in as principal lecturer."
                : token && role === "pl"
                ? "Welcome! You are logged in as programme leader."
                : "Not logged in."}
            </p>
            {role === "student" && (
              <>
                <Link
                  to="/monitoring"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Monitoring
                </Link>
                <br />
                <Link
                  to="/rating"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Rating
                </Link>
                <br />
              </>
            )}
            {role === "lecturer" && (
              <>
                <Link
                  to="/classes"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Classes
                </Link>
                <br />
                <Link
                  to="/reports"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Reports
                </Link>
                <br />
                <Link
                  to="/monitoring"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Monitoring
                </Link>
                <br />
                <Link
                  to="/rating"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Rating
                </Link>
                <br />
              </>
            )}
            {role === "prl" && (
              <>
                <Link
                  to="/courses"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Courses
                </Link>
                <br />
                <Link
                  to="/reports"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Reports
                </Link>
                <br />
                <Link
                  to="/monitoring"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Monitoring
                </Link>
                <br />
                <Link
                  to="/rating"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Rating
                </Link>
                <br />
                <Link
                  to="/classes"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Classes
                </Link>
                <br />
              </>
            )}
            {role === "pl" && (
              <>
                <Link
                  to="/courses"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Courses
                </Link>
                <br />
                <Link
                  to="/reports"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Reports
                </Link>
                <br />
                <Link
                  to="/monitoring"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Monitoring
                </Link>
                <br />
                <Link
                  to="/classes"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Classes
                </Link>
                <br />
                <Link
                  to="/lectures"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Lectures
                </Link>
                <br />
                <Link
                  to="/rating"
                  className="btn mb-3"
                  style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
                >
                  Rating
                </Link>
                <br />
              </>
            )}
            <button
              className="btn"
              style={{ backgroundColor: "#000", color: "#fff", width: "170px" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;