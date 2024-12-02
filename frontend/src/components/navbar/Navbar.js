import "./Navbar.css";
import OvalButton from "../button/OvalButton/OvalButton";
import { useUser } from "../../context/user-context";
import ProfileDropdown from "./profileDropdown/ProfileDropdown";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, isLoggedIn } = useUser();

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="navbar-container">
      <ul className="navbar-items">
        <NavLink to="" className="navlink">
          Home
        </NavLink>
        {user && user.role === "faculty" && (
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
        {user && user.role === "student" && (
          <>
            <NavLink to="student/reservation" className="navlink">
              Reserve
            </NavLink>
            <NavLink to="student/feedback" className="navlink">
              Feedback
            </NavLink>
          </>
        )}
      </ul>
      {isLoggedIn ? (
        <ProfileDropdown />
      ) : (
        <OvalButton label="Login" onClick={handleLogin} />
      )}
    </div>
  );
};

export default Navbar;
