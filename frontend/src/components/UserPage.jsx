import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState({});

  const userId = localStorage.getItem("userid");
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLogin = () => {
      const username = localStorage.getItem("username");
      const userid = localStorage.getItem("userid");
      const role = localStorage.getItem("role");
      if (!username || !userid || role === "admin") {
        navigate("/login");
      }
    };
    isUserLogin();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, taskRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${userId}`),
          axios.get(`http://localhost:5000/api/tasks/user/${userId}`),
        ]);
        setUser(userRes.data.user);
        setTasks(taskRes.data.tasks);
      } catch (error) {
        console.error("Error fetching user or tasks", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleCommentChange = (taskId, value) => {
    setComments((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCompleteTask = async (taskId) => {
    const comment = comments[taskId];
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/comment-complete/${taskId}`,
        {
          comment,
          completed: true,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? res.data.task : task))
      );
      setComments((prev) => ({ ...prev, [taskId]: "" }));
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const handleHideTask = async (taskId) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/hide/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Failed to hide task:", error);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter((task) => !task.completed);

  if (!user)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            👤 {user.username}'s Dashboard
          </h2>
          <div className="space-x-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              🔓 Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Incomplete Tasks */}
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              ❌ Incomplete Tasks
            </h3>
            {incompleteTasks.length ? (
              incompleteTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white shadow rounded-lg p-5 mb-5 border-l-4 border-red-500"
                >
                  <h4 className="font-bold text-lg">{task.title}</h4>
                  <p className="text-gray-700 mb-3">{task.description}</p>
                  <textarea
                    className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                    placeholder="Add a comment..."
                    value={comments[task._id] || ""}
                    onChange={(e) =>
                      handleCommentChange(task._id, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleCompleteTask(task._id)}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    ✅ Mark as Complete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">You have no incomplete tasks!</p>
            )}
          </div>

          {/* Completed Tasks */}
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-4">
              ✅ Completed Tasks
            </h3>
            {completedTasks.length ? (
              completedTasks.map((task) => (
                <div
                  key={task._id}
                  className="relative bg-white shadow rounded-lg p-5 mb-5 border-l-4 border-green-500"
                >
                  <button
                    onClick={() => handleHideTask(task._id)}
                    className="absolute top-3 right-4 text-red-500 hover:text-red-700 text-xl"
                    title="Hide Task"
                  >
                    ×
                  </button>
                  <h4 className="font-bold text-lg">{task.title}</h4>
                  <p className="text-gray-700">{task.description}</p>
                  {task.comments?.length > 0 && (
                    <div className="mt-3 text-sm text-gray-600">
                      <strong>Comments:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        {task.comments.map((cmt, idx) => (
                          <li key={idx}>{cmt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No completed tasks yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
