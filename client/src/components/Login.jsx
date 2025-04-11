import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token); // Store token
      alert("Login successful!");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-4 rounded-md disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          New user?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Register for free
          </a>
        </p>
      </div>
    </div>
  );
}
