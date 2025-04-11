import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddJob() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateOfApplication, setDateOfApplication] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!company || !role || !dateOfApplication) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/job/add",
        { company, role, status, dateOfApplication, link },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Job added successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Add New Job Application
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleAddJob} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Company Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Role</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Status</label>
            <select
              className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Date of Application</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={dateOfApplication}
              onChange={(e) => setDateOfApplication(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Application Link (if any)</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
              placeholder="Application link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Adding Job..." : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
