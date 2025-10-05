import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#000" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ color: "#fff" }} to={token ? "/dashboard" : "/login"}>
          LUCT Reporting
        </Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && (
              <>
                {role === "lecturer" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" style={{ color: "#fff" }} to="/dashboard">Dashboard</Link>
                    </li>
                    {/* ...other lecturer links */}
                  </>
                )}
                {role === "prl" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" style={{ color: "#fff" }} to="/dashboard">Dashboard</Link>
                    </li>
                    {/* ...other prl links */}
                  </>
                )}
                {role === "pl" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" style={{ color: "#fff" }} to="/dashboard">Dashboard</Link>
                    </li>
                    {/* ...other pl links */}
                  </>
                )}
                {role === "student" && (
                  <>
                    {/* Only Monitoring and Rating for students! */}
                    <li className="nav-item">
                      <Link className="nav-link" style={{ color: "#fff" }} to="/monitoring">Monitoring</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" style={{ color: "#fff" }} to="/rating">Rating</Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button className="btn btn-link nav-link" style={{ color: "#fff" }} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: "#fff" }} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: "#fff" }} to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;