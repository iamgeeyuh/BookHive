import "./FacultyEquipmentBorrowed.css";
import { FaInbox } from "react-icons/fa6";
import { useEffect, useState } from "react";
import FacultyEquipmentBorrowedItem from "../FacultyEquipmentBorrowedItem/FacultyEquipmentBorrowedItem";
import SquareButton from "../../../button/SquareButton/SquareButton";

const FacultyEquipmentBorrowed = () => {
  const [equipments, setEquipments] = useState([]);

  const fetchEquipment = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/equipment/borrowed`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEquipments(data);
      } else {
        throw new Error("Failed to fetch equipment");
      }
    } catch (err) {
      console.error("Error fetching equipment:", err);
    }
  };

  const handleReturn = async (userId, equipmentId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/equipment/${equipmentId}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Refresh the list of borrowed equipment
        window.location.reload();
      } else {
        throw new Error("Failed to return equipment");
      }
    } catch (err) {
      console.error("Error returning equipment:", err);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);
  return (
    <div className="faculty-equipment-borrowed-container">
      <div className="faculty-equipment-header">
        <FaInbox />
        <p>Equipment Borrowed</p>
      </div>
      {equipments &&
        equipments.length > 0 &&
        equipments.map((equipment) => (
          <div className="faculty-equipment-borrowed-entry">
            <FacultyEquipmentBorrowedItem
              key={equipment.equipment._id}
              equipment={equipment}
            />
            <SquareButton
              label="Return"
              onClick={() =>
                handleReturn(equipment.user._id, equipment.equipment._id)
              }
            />
          </div>
        ))}
    </div>
  );
};

export default FacultyEquipmentBorrowed;
