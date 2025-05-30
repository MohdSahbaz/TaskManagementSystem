import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Task Manager</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Manage tasks easily with a simple role-based access system
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
