import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/root/Root";
import Error from "./components/error/Error";
import Home from "./components/home/Home";
import FacultyEquipment from "./components/faculty/equipment/FacultyEquipment";
import FacultyFeedback from "./components/faculty/feedback/FacultyFeedback";
import FacultyReservation from "./components/faculty/reservation/FacultyReservation";
import FacultyRoom from "./components/faculty/rooms/FacultyRoom";
import StudentReservation from "./components/student/reservation/StudentReservation";
import RoomDetails from "./components/student/reservation/RoomDetails";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import StudentFeedback from "./components/student/feedback/StudentFeedback";

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

      {
        path: "student",
        children: [
          { 
            path: "reservation", 
            element:(
              <RoleProtectedRoute requiredRole="student">
              <StudentReservation /> 
              </RoleProtectedRoute>
            )
          },
          { 
            path: "reservation/:roomId", 
            element: (
              <RoleProtectedRoute requiredRole="student">
                <RoomDetails /> 
              </RoleProtectedRoute>
            )
          }, 
          { 
            path: "feedback", 
            element: (
              <RoleProtectedRoute requiredRole="student">
                <StudentFeedback />
              </RoleProtectedRoute>
            )
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
