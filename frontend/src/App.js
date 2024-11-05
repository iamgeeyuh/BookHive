import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/root/Root";
import Error from "./components/error/Error";
import Home from "./components/home/Home";
import FacultyEquipment from "./components/faculty/equipment/FacultyEquipment";
import FacultyFeedback from "./components/faculty/feedback/FacultyFeedback";
import FacultyReservation from "./components/faculty/reservation/FacultyReservation";
import FacultyRoom from "./components/faculty/rooms/FacultyRoom";

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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
