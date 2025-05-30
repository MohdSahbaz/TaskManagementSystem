import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserPage from "./components/UserPage";
import AdminPage from "./components/AdminPage";
import AdminAssignedTasksPage from "./components/AdminAssignedTasksPage";
import AssignTaskForm from "./components/AssignTaskForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/user/profile",
    element: <UserPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },  
  {
    path: "/alltask",
    element: <AdminAssignedTasksPage />,
  },
  {
    path: "/assigntask",
    element: <AssignTaskForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
