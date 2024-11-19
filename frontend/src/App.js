import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/root/Root";
import Error from "./components/error/Error";
import Home from "./components/home/Home";
import FacultyEquipment from "./components/faculty/equipment/FacultyEquipment";
import FacultyFeedback from "./components/faculty/feedback/FacultyFeedback";
import FacultyReservation from "./components/faculty/reservation/FacultyReservation";
import FacultyRoom from "./components/faculty/rooms/FacultyRoom";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "faculty",
        children: [
          {
            path: "reservation",
            element: (
              <RoleProtectedRoute requiredRole="faculty">
                <FacultyReservation />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "room",
            element: (
              <RoleProtectedRoute requiredRole="faculty">
                <FacultyRoom />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "equipment",
            element: (
              <RoleProtectedRoute requiredRole="faculty">
                <FacultyEquipment />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "feedback",
            element: (
              <RoleProtectedRoute requiredRole="faculty">
                <FacultyFeedback />
              </RoleProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
