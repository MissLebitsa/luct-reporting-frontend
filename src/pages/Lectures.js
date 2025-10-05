import React, { useEffect, useState } from "react";
import axios from "axios";

const Lectures = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [lectures, setLectures] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (role !== "pl") return;
    const fetchLectures = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/lectures", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLectures(res.data);
      } catch (err) {
        setError("Failed to fetch lectures.");
      }
    };
    fetchLectures();
  }, [token, role]);

  return (
    <div className="container-fluid min-vh-100 py-5" style={{ backgroundColor: "#000" }}>
      <div className="col-12 col-lg-10 mx-auto">
        <div className="card" style={{ backgroundColor: "#fff", color: "#000" }}>
          <div className="card-body">
            <h2 className="mb-4 text-center" style={{ color: "#000" }}>Lectures</h2>
            {error && <div className="alert alert-danger" style={{ backgroundColor: "#000", color: "#fff" }}>{error}</div>}
            <table className="table table-bordered">
              <thead style={{ backgroundColor: "#000", color: "#fff" }}>
                <tr>
                  <th>Lecture Topic</th>
                  <th>Date</th>
                  <th>Module</th>
                  <th>Lecturer</th>
                </tr>
              </thead>
              <tbody>
                {lectures.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">No lectures found.</td>
                  </tr>
                ) : (
                  lectures.map(lecture => (
                    <tr key={lecture.id}>
                      <td>{lecture.topic}</td>
                      <td>{lecture.date}</td>
                      <td>{lecture.module_name}</td>
                      <td>{lecture.lecturer_name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lectures;