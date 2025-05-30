import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssignTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedToUsername, setAssignedToUsername] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const adminId = localStorage.getItem("userid");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/tasks/assign", {
        adminId,
        title,
        description,
        assignedToUsername,
      });
      setMessage("Task assigned successfully!");
      setTitle("");
      setDescription("");
      setAssignedToUsername("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to assign task. Please try again."
      );
    }
  };

  useEffect(() => {
    const isUserLogin = () => {
      const useranme = localStorage.getItem("username");
      const userid = localStorage.getItem("userid");
      const userrole = localStorage.getItem("role");
      if (!useranme && !userid && !userrole === "admin") {
        navigate("/login");
      }
    };
    isUserLogin();
  }, []);

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Assign Task to User
      </h2>

      {message && (
        <p className="mb-4 text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block mb-2 text-sm font-semibold text-gray-700"
            htmlFor="title"
          >
            Task Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-semibold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="5"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-semibold text-gray-700"
            htmlFor="assignedToUsername"
          >
            Assign To (Username)
          </label>
          <input
            id="assignedToUsername"
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter username"
            value={assignedToUsername}
            onChange={(e) => setAssignedToUsername(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md text-white font-semibold
                     transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignTaskForm;
