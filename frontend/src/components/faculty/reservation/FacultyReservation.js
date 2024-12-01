import SquareButton from "../../button/SquareButton/SquareButton";
import "./FacultyReservation.css"
import FacultyReservationTable from "./FacultyReservationTable/FacultyReservationTable";
import FacultyReservationEdit from "./FacultyReservationEdit/FacultyReservationEdit";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";

const FacultyReservation = () => {
  const [edit, setEdit] = useState(false);
  const [reservationToEdit, setReservationToEdit] = useState("");

  return edit ? (
    <FacultyReservationEdit
      reservationToEdit={reservationToEdit}
      goBack={() => {
        setEdit(false);
      }}
    />
  ) : (
    <div className="faculty-reservation-container">
      <SquareButton
        label="Create Reservation"
        icon={<FaPlus style={{ marginRight: "0.5rem" }} />}
        onClick={() => {
          setEdit(true);
          setReservationToEdit("");
        }}
      />
      <FacultyReservationTable setReservationToEdit={setReservationToEdit} setEdit={setEdit} />
    </div>
  );
};

export default FacultyReservation;
