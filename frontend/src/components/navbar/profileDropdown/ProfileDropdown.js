import { useContext } from "react";
import "./ProfileDropdown.css";
import UserContext from "../../../context/user-context";

const ProfileDropdown = () => {
  const ctx = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        ctx.setUser(null);
        ctx.setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="profile-dropdown">
      <div className="profile">
        <img src={ctx.user.profilePhoto} alt="profile" />
        <p>{ctx.user.displayName}</p>
      </div>
      <div className="dropdown-menu" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default ProfileDropdown;
