import "./ProfileDropdown.css";
import { useUser } from "../../../context/user-context";

const ProfileDropdown = () => {
  const { user, logout } = useUser();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        logout();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="profile-dropdown">
      <div className="profile">
        <img src={user.profilePhoto} alt="profile" />
        <p>{user.displayName}</p>
      </div>
      <div className="dropdown-menu" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default ProfileDropdown;
