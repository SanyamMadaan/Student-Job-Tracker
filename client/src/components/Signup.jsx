import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    console.log(import.meta.env.VITE_BACKEND_URL); 

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {
        name,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      window.location.href = "/login"; // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Already a user?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
