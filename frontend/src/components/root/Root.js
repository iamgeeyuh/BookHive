import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Root.css";

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="outlet">
        <Outlet />
    </div>
  );
};

export default Root;