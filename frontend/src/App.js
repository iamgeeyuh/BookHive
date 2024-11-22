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
          { path: "reservation", element: <FacultyReservation /> },
          { path: "room", element: <FacultyRoom /> },
          { path: "equipment", element: <FacultyEquipment /> },
          { path: "feedback", element: <FacultyFeedback /> },
        ],
      },

      {
        path: "student",
        children: [
          { path: "reservation", element: <StudentReservation /> },
          { path: "reservation/:roomId", element: <RoomDetails /> }, // Route for room details
          // { path: "room", element: <FacultyRoom /> },
          // { path: "equipment", element: <StudentEquipment /> },
          // { path: "feedback", element: <StudentFeedback /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
