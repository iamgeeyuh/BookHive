import "./LoggedOutHome.css";
import { BsHouseDoor } from "react-icons/bs";
import { CiMail, CiPhone } from "react-icons/ci";

const LoggedOutHome = () => {
  return (
    <div className="container">
      <div className="top">
        <h1>Bern Dibner Library</h1>
        <h2>NYU Tandon School of Engineering</h2>
        <div className="info">
          <BsHouseDoor style={{ color: "#AF5E36", fontSize: "1.25rem" }} />
          <p>5 MetroTech Center Brooklyn, NY 11201-9818</p>
        </div>
        <div className="info">
          <CiMail style={{ color: "#AF5E36", fontSize: "1.25rem" }} />
          <p>dibner.library@nyu.edu</p>
        </div>
        <div className="info">
          <CiPhone style={{ color: "#AF5E36", fontSize: "1.25rem" }} />
          <p>+1 646 997 3530</p>
        </div>
      </div>
      <p>
        The library workers of the Bern Dibner Library of Science and Technology
        seek to educate and support our NYU Brooklyn and Tandon community as
        they research within and transform their information ecosystems. We
        accomplish this by contributing our expertise to building collections,
        teaching information literacy, creating welcoming spaces, and
        facilitating knowledge creation.
      </p>
    </div>
  );
};

export default LoggedOutHome;
