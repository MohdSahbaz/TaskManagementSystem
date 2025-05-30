import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAssignedTasksPage = () => {
  const [tasks, setTasks] = useState([]);

  const adminId = localStorage.getItem("userid");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/tasks/admin/assignedby/${adminId}`
        );
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Failed to fetch admin-assigned tasks:", error);
      }
    };

    if (adminId) {
      fetchTasks();
    }
  }, [adminId]);

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const visibleTasks = tasks.filter((task) => !task.hidden);
  const completedTasks = visibleTasks.filter((task) => task.completed);
  const incompleteTasks = visibleTasks.filter((task) => !task.completed);

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

  const renderTable = (taskList) => (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-indigo-100">
          <tr>
            <th className="border border-indigo-300 px-6 py-3 text-left text-indigo-900 font-semibold">
              Title
            </th>
            <th className="border border-indigo-300 px-6 py-3 text-left text-indigo-900 font-semibold">
              Description
            </th>
            <th className="border border-indigo-300 px-6 py-3 text-left text-indigo-900 font-semibold">
              Assigned To
            </th>
            <th className="border border-indigo-300 px-6 py-3 text-left text-indigo-900 font-semibold">
              Status
            </th>
            <th className="border border-indigo-300 px-6 py-3 text-center text-indigo-900 font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task, idx) => (
            <tr
              key={task._id}
              className={`transition-colors duration-200 ${
                idx % 2 === 0 ? "bg-white" : "bg-indigo-50"
              } hover:bg-indigo-200`}
            >
              <td className="border border-indigo-300 px-6 py-3 text-gray-700">
                {task.title}
              </td>
              <td className="border border-indigo-300 px-6 py-3 text-gray-700">
                {task.description}
              </td>
              <td className="border border-indigo-300 px-6 py-3 text-gray-700">
                {task.assignedTo?.username || "N/A"}
              </td>
              <td className="border border-indigo-300 px-6 py-3 text-gray-700 font-medium">
                {task.completed ? (
                  <span className="text-green-600 font-semibold">
                    Completed
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">Incomplete</span>
                )}
              </td>
              <td className="border border-indigo-300 px-6 py-3 text-center">
                <button
                  onClick={() => handleDelete(task._id)}
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                  aria-label={`Delete task ${task.title}`}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-900">
        📋 Tasks Assigned by Admin
      </h1>

      {/* Incomplete Tasks */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-red-600 border-b-2 border-red-400 pb-2">
          ❌ Incomplete Tasks
        </h2>
        {incompleteTasks.length > 0 ? (
          renderTable(incompleteTasks)
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No incomplete tasks found.
          </p>
        )}
      </section>

      {/* Completed Tasks */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-green-700 border-b-2 border-green-500 pb-2">
          ✅ Completed Tasks
        </h2>
        {completedTasks.length > 0 ? (
          renderTable(completedTasks)
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No completed tasks found.
          </p>
        )}
      </section>
    </div>
  );
};

export default AdminAssignedTasksPage;
