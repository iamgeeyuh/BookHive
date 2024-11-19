import LoggedOutHome from "./loggedOutHome/LoggedOutHome";
import StudentHome from "../student/studentHome/StudentHome";
import FacultyHome from "../faculty/facultyHome/FacultyHome";
import { useUser } from "../../context/user-context";

const Home = () => {
  const { user, isLoggedIn } = useUser();

  if (isLoggedIn) {
    if (user.role === "student") return <StudentHome />;
    if (user.role === "faculty") return <FacultyHome />;
  }
  return <LoggedOutHome />;
};

export default Home;
