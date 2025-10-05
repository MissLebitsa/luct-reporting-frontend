import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", code: "" });
  const [assign, setAssign] = useState({ courseId: "", moduleId: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        setError("Failed to fetch courses.");
      }
    };
    const fetchModules = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/modules", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModules(res.data);
      } catch (err) {
       
      }
    };
    fetchCourses();
    fetchModules();
  }, [token]);

  const handleCourseChange = e => setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  const handleAssignChange = e => setAssign({ ...assign, [e.target.name]: e.target.value });

  const handleAddCourse = async e => {
    e.preventDefault();
    setSuccess(""); setError("");
    try {
      await axios.post("http://localhost:5000/api/courses", newCourse, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Course added!");
      setNewCourse({ name: "", code: "" });
    } catch (err) {
      setError("Failed to add course.");
    }
  };

  const handleAssignModule = async e => {
    e.preventDefault();
    setSuccess(""); setError("");
    try {
      await axios.post("http://localhost:5000/api/courses/assign", assign, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Module assigned!");
      setAssign({ courseId: "", moduleId: "" });
    } catch (err) {
      setError("Failed to assign module.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 py-5" style={{ backgroundColor: "#000" }}>
      <div className="col-12 col-lg-10 mx-auto">
        <div className="card" style={{ backgroundColor: "#fff", color: "#000" }}>
          <div className="card-body">
            <h2 className="mb-4 text-center" style={{ color: "#000" }}>Courses</h2>
            {error && <div className="alert alert-danger" style={{ backgroundColor: "#000", color: "#fff" }}>{error}</div>}
            {success && <div className="alert alert-success" style={{ backgroundColor: "#000", color: "#fff" }}>{success}</div>}
            
            {role === "pl" && (
              <form className="mb-4 row g-2" onSubmit={handleAddCourse}>
                <div className="col">
                  <input type="text" name="name" className="form-control"
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={handleCourseChange}
                    required
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                  />
                </div>
                <div className="col">
                  <input type="text" name="code" className="form-control"
                    placeholder="Course Code"
                    value={newCourse.code}
                    onChange={handleCourseChange}
                    required
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn" style={{ backgroundColor: "#000", color: "#fff" }}>Add Course</button>
                </div>
              </form>
            )}
            
            {role === "pl" && (
              <form className="mb-4 row g-2" onSubmit={handleAssignModule}>
                <div className="col">
                  <select name="courseId" className="form-select"
                    value={assign.courseId}
                    onChange={handleAssignChange}
                    required
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}>
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col">
                  <select name="moduleId" className="form-select"
                    value={assign.moduleId}
                    onChange={handleAssignChange}
                    required
                    style={{ backgroundColor: "#fff", color: "#000", borderColor: "#000" }}>
                    <option value="">Select Module</option>
                    {modules.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn" style={{ backgroundColor: "#000", color: "#fff" }}>Assign Module</button>
                </div>
              </form>
            )}

            <table className="table table-bordered">
              <thead style={{ backgroundColor: "#000", color: "#fff" }}>
                <tr>
                  <th>Course Name</th>
                  <th>Course Code</th>
                  <th>Assigned Modules</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">No courses found.</td>
                  </tr>
                ) : (
                  courses.map(course => (
                    <tr key={course.id}>
                      <td>{course.name}</td>
                      <td>{course.code}</td>
                      <td>
                        {(course.modules || []).map(m => (
                          <div key={m.id}>{m.name}</div>
                        ))}
                      </td>
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
export default Courses;