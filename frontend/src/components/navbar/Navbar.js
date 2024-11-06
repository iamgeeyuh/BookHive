import "./Navbar.css";
import Button from "../button/Button";
import { useContext } from "react";
import UserContext from "../../context/user-context";
import ProfileDropdown from "./profileDropdown/ProfileDropdown";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const ctx = useContext(UserContext);

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="navbar-container">
      <ul className="navbar-items">
        <NavLink to="" className="navlink">
          Home
        </NavLink>
        {ctx.user && ctx.user.role === "faculty" && (
          <>
            <NavLink to="faculty/reservation" className="navlink">
              Reservations
            </NavLink>
            <NavLink to="faculty/room" className="navlink">
              Rooms
            </NavLink>
            <NavLink to="faculty/equipment" className="navlink">
              Equipment
            </NavLink>
            <NavLink to="faculty/feedback" className="navlink">
              Feedback
            </NavLink>
          </>
        )}
        {ctx.user && ctx.user.role === "student" && (
          <>
            <NavLink to="" className="navlink">
              Reserve
            </NavLink>
            <NavLink to="" className="navlink">
              Report
            </NavLink>
          </>
        )}
      </ul>
      {ctx.isLoggedIn ? (
        <ProfileDropdown />
      ) : (
        <Button label="Login" onClick={handleLogin} />
      )}
    </div>
  );
};

export default Navbar;
