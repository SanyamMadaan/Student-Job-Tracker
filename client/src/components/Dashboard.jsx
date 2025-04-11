import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/job/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const updateJobStatus = async (jobId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/update-job/${jobId}`,
        { Status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === jobId ? { ...job, Status: newStatus } : job))
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };


  const deleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Do you really want to delete this job?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/job/delete-job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== jobId)); // Remove job from UI
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Applied Jobs</h1>
          <button
            onClick={() => navigate("/addjob")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Job +
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                <th className="border p-2">Company Name</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date of Application</th>
                <th className="border p-2">Job Link</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job._id} className="text-center text-gray-800 dark:text-white">
                    <td className="border p-2">{job.company}</td>
                    <td className="border p-2">{job.Role}</td>
                    <td className="border p-2">
                    <select
                        value={job.Status}
                        onChange={(e) => updateJobStatus(job._id, e.target.value)}
                        className="border rounded-md p-1 bg-white dark:bg-gray-800"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offer">Offer</option>
                      </select>
                      </td>
                    <td className="border p-2">{new Date(job.DateOfApplication).toLocaleDateString("en-GB")}</td>
                    <td className="border p-2">
                      <a href={job.Link} target="_blank" className="text-blue-500 underline">
                        View
                      </a>
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => deleteJob(job._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-600 dark:text-gray-300 p-4">
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
