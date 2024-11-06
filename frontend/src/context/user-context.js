import { createContext, useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => <ClipLoader color="#09f" loading={true} size={35} />;

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/status`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setUser(data.user);
          setIsLoggedIn(data.user != null);
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (loading) {
    return <Spinner />; 
  }

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
