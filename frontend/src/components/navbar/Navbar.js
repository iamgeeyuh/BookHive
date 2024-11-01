import "./Navbar.css";
import Button from "../button/Button";
import { useContext } from "react";
import UserContext from "../../context/user-context";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const ctx = useContext(UserContext);

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
  };

  return (
    <ul>
      <li>Home</li>
      {ctx.isLoggedIn ? (
        <ProfileDropdown />
      ) : (
        <Button label="Login" onClick={handleLogin} />
      )}
    </ul>
  );
};

export default Navbar;
