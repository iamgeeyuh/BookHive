import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Root.css";

const Root = () => {
  return (
    <div className="root">
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
