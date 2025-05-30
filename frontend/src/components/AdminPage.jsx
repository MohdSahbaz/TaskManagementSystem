import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Welcome Admin 👋
      </h1>

      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <button
          onClick={() => navigate("/assigntask")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Assign Task
        </button>

        <button
          onClick={() => navigate("/alltask")}
          className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Show All Tasks
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
