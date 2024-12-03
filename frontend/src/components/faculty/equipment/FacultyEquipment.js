import "./FacultyEquipment.css";
import FacultyEquipmentBorrowed from "./FacultyEquipmentBorrowed/FacultyEquipmentBorrowed";
import FacultyEquipmentForm from "./FacultyEquipmentForm/FacultyEquipmentForm";
import FacultyEquipmentInventory from "./FacultyEquipmentInventory/FacultyEquipmentInventory";

const FacultyEquipment = () => {
  return (
    <div className="faculty-equipment-container">
      <div className="faculty-equipment-left-container">
        <FacultyEquipmentForm />
        <FacultyEquipmentInventory />
      </div>
      <FacultyEquipmentBorrowed />
    </div>
  );
};

export default FacultyEquipment;
