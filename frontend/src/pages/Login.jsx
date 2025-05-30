import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isUserLogin = () => {
      const useranme = localStorage.getItem("username");
      const userid = localStorage.getItem("userid");
      const userrole = localStorage.getItem("role");
      if (useranme && userid) {
        if (userrole === "admin") {
          navigate("/admin");
        } else if (userrole === "user") {
          navigate("/user/profile");
        }
      }
    };
    isUserLogin();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setMessage(`${res.data.message} as ${res.data.role}`);
      setRole(res.data.role);

      localStorage.setItem("username", res.data.userName);
      localStorage.setItem("userid", res.data.userId);
      localStorage.setItem("role", res.data.role);

      setUsername("");
      setPassword("");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user/profile");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
      setRole(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-sm text-right">
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Don&apos;t have an account? Sign up
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center font-semibold ${
              role ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {role && (
          <p className="mt-2 text-center text-sm text-gray-600">
            {role === "admin"
              ? "You have admin access."
              : "You have user access."}
          </p>
        )}
      </div>
    </div>
  );
}
