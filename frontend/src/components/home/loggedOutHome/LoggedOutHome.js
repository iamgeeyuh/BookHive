import "./LoggedOutHome.css";
import { BsHouseDoor } from "react-icons/bs";
import { CiMail, CiPhone } from "react-icons/ci";
import LoggedOutCalendar from "./loggedOutSchedule/LoggedOutSchedule";

const LoggedOutHome = () => {
  return (
    <div className="logged-out-container">
      <div className="logged-out-description">
        <div className="logged-out-description-top">
          <h1>Bern Dibner Library</h1>
          <h2>NYU Tandon School of Engineering</h2>
          <div className="logged-out-info">
            <BsHouseDoor style={{ color: "#AF5E36", fontSize: "1.25rem" }} />
            <p>5 MetroTech Center Brooklyn, NY 11201-9818</p>
          </div>
          <div className="logged-out-info">
            <CiMail style={{ color: "#AF5E36", fontSize: "1.25rem" }} />
            <p>dibner.library@nyu.edu</p>
          </div>
          <div className="logged-out-info">
            <CiPhone style={{ color: "#AF5E36", fontSize: "1.25rem" }} />
            <p>+1 646 997 3530</p>
          </div>
        </div>
        <p>
          The library workers of the Bern Dibner Library of Science and
          Technology seek to educate and support our NYU Brooklyn and Tandon
          community as they research within and transform their information
          ecosystems. We accomplish this by contributing our expertise to
          building collections, teaching information literacy, creating
          welcoming spaces, and facilitating knowledge creation.
        </p>
      </div>
      <LoggedOutCalendar />
    </div>
  );
};

export default LoggedOutHome;
