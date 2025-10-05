import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState({
    faculty_name: "",
    class_name: "",
    week_of_reporting: "",
    course_code: "",
    lecturer_name: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchReports();
    // eslint-disable-next-line
  }, [token]);

  const fetchReports = async (params = {}) => {
    try {
      const url =
        Object.values(params).some((v) => v)
          ? "http://localhost:5000/api/reports/search"
          : "http://localhost:5000/api/reports";
      const res = await axios.get(url, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      setError("Failed to fetch reports.");
    }
  };

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReports(search);
  };

  const handleDownloadExcel = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports/download/excel", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reports.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError("Failed to download Excel file.");
    }
  };

  return (
    <div
      className="container-fluid min-vh-100"
      style={{ backgroundColor: "#000", color: "#fff" }}
    >
      <div className="row justify-content-center py-5">
        <div className="col-12 col-lg-10">
          <div className="card" style={{ backgroundColor: "#fff", color: "#000" }}>
            <div className="card-body">
              <h2 className="mb-4 text-center" style={{ color: "#000" }}>All Reports</h2>
              {error && (
                <div className="alert alert-danger" style={{ backgroundColor: "#000", color: "#fff", border: "none" }}>
                  {error}
                </div>
              )}
              {}
              <form className="row g-2 mb-3" onSubmit={handleSearch}>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="faculty_name"
                    value={search.faculty_name}
                    onChange={handleChange}
                    placeholder="Faculty Name"
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="class_name"
                    value={search.class_name}
                    onChange={handleChange}
                    placeholder="Class Name"
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="week_of_reporting"
                    value={search.week_of_reporting}
                    onChange={handleChange}
                    placeholder="Week"
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="course_code"
                    value={search.course_code}
                    onChange={handleChange}
                    placeholder="Course Code"
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="lecturer_name"
                    value={search.lecturer_name}
                    onChange={handleChange}
                    placeholder="Lecturer Name"
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#000", color: "#fff" }}
                  >
                    Search
                  </button>
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: "#000", color: "#fff" }}
                    onClick={handleDownloadExcel}
                  >
                    Download Excel
                  </button>
                </div>
              </form>
              {/* Reports Table */}
              <div className="table-responsive">
                <table className="table table-bordered" style={{ backgroundColor: "#fff", color: "#000" }}>
                  <thead style={{ backgroundColor: "#000", color: "#fff" }}>
                    <tr>
                      <th>ID</th>
                      <th>Faculty Name</th>
                      <th>Class Name</th>
                      <th>Date</th>
                      <th>Course Name</th>
                      <th>Lecturer Name</th>
                      <th>Students Present</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">No reports found.</td>
                      </tr>
                    ) : (
                      reports.map((r) => (
                        <tr key={r.id}>
                          <td>{r.id}</td>
                          <td>{r.faculty_name}</td>
                          <td>{r.class_name}</td>
                          <td>{r.date_of_lecture}</td>
                          <td>{r.course_name}</td>
                          <td>{r.lecturer_name}</td>
                          <td>{r.actual_students_present}</td>
                          <td>
                            <Link
                              to={`/reports/${r.id}`}
                              className="btn btn-sm"
                              style={{ backgroundColor: "#000", color: "#fff" }}
                            >View</Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-center">
                <Link
                  to="/dashboard"
                  className="btn"
                  style={{ backgroundColor: "#000", color: "#fff" }}
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;