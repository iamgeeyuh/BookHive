import { useContext } from "react";
import LoggedOutHome from "./loggedOutHome/LoggedOutHome";
import StudentHome from "../student/studentHome/StudentHome";
import FacultyHome from "../faculty/facultyHome/FacultyHome";
import UserContext from "../../context/user-context";

const Home = () => {
  const ctx = useContext(UserContext);

  if (ctx.isLoggedIn) {
    if (ctx.user.role === "student") return <StudentHome />;
    if (ctx.user.role === "faculty") return <FacultyHome />;
  }
  return <LoggedOutHome />;
};

export default Home;
