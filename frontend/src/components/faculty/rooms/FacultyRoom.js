import SquareButton from "../../button/SquareButton/SquareButton";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import FacultyRoomEdit from "./FacultyRoomEdit/FacultyRoomEdit";

const FacultyRoom = () => {
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {edit ? (
        <FacultyRoomEdit
          goBack={() => {
            setEdit(false);
          }}
        />
      ) : (
        <SquareButton
          label="Create Room"
          icon={<FaPlus style={{ marginRight: "0.5rem" }} />}
          onClick={() => {
            setEdit(true);
          }}
        />
      )}
    </div>
  );
};

export default FacultyRoom;
