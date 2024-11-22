import SquareButton from "../../button/SquareButton/SquareButton";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import FacultyRoomEdit from "./FacultyRoomEdit/FacultyRoomEdit";
import FacultyRoomTable from "./FacultyRoomTable/FacultyRoomTable";
import "./FacultyRoom.css";

const FacultyRoom = () => {
  const [edit, setEdit] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState("");

  return edit ? (
    <FacultyRoomEdit
      roomToEdit={roomToEdit}
      goBack={() => {
        setEdit(false);
      }}
    />
  ) : (
    <div className="faculty-room-container">
      <SquareButton
        label="Create Room"
        icon={<FaPlus style={{ marginRight: "0.5rem" }} />}
        onClick={() => {
          setEdit(true);
          setRoomToEdit("");
        }}
      />
      <FacultyRoomTable setRoomToEdit={setRoomToEdit} setEdit={setEdit} />
    </div>
  );
};

export default FacultyRoom;
