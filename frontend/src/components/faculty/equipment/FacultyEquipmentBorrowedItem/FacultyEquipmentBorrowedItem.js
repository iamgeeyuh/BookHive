import "./FacultyEquipmentBorrowedItem.css";
import moment from "moment";

const FacultyEquipmentBorrowedItem = ({ equipment }) => {
  return (
    <div className="faculty-equipment-borrowed-item-container">
      <p style={{ fontWeight: "bold" }}>{`${
        equipment.user.email.split("@")[0]
      }: ${equipment.equipment.type}`}</p>
      <p>{moment(equipment.equipment.dueDate).local().format("MMM D, YYYY")}</p>
    </div>
  );
};

export default FacultyEquipmentBorrowedItem;
