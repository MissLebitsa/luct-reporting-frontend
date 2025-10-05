import { Link } from "react-router-dom";

const Rating = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#000" }}>
        <div className="col-12 col-md-8">
          <div className="card shadow" style={{ backgroundColor: "#fff", color: "#000" }}>
            <div className="card-body text-center">
              <h2>Access Denied</h2>
              <p>You must be logged in to view this page.</p>
              <Link
                to="/login"
                className="btn mt-3"
                style={{ backgroundColor: "#000", color: "#fff", width: "200px" }}
              >
                Go to Login
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
            <h2>Rating</h2>
            <p>(Your rating system or content goes here.)</p>
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

export default Rating;