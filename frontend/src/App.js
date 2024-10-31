import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/root/Root";
import Error from "./components/error/Error";
import Home from "./components/home/Home";
import StudentHome from "./components/home/StudentHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/student-home", element: <StudentHome /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
