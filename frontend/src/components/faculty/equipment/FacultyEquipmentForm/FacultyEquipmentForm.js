import "./FacultyEquipmentForm.css";
import { FaRegEdit } from "react-icons/fa";
import OvalButton from "../../../button/OvalButton/OvalButton";
import { useState } from "react";

const FacultyEquipmentForm = () => {
  const [netId, setNetId] = useState("");
  const [equipmentId, setEquipmentId] = useState("");

  const handleSubmit = async () => {
    try {
      const equipmentResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/equipment`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            netId,
            equipmentId,
          }),
        }
      );

      if (!equipmentResponse.ok) {
        const errorData = await equipmentResponse.json();
        throw new Error(errorData.message || "Failed to add equipment.");
      }

      const equipment = await equipmentResponse.json();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="faculty-equipment-form-container">
      <div className="faculty-equipment-header">
        <FaRegEdit />
        <p>Borrow Equipment</p>
      </div>
      <div className="faculty-equipment-left-contents-container">
        <div
          className="faculty-equipment-input"
          style={{ marginBottom: "1rem" }}
        >
          <label>NetID</label>
          <input
            placeholder="Enter NetID"
            value={netId}
            onChange={(event) => setNetId(event.target.value)}
          />
        </div>
        <div className="faculty-equipment-form-submit">
          <div className="faculty-equipment-input" style={{ width: "70%" }}>
            <label>Equipment ID</label>
            <input
              placeholder="Enter Equipment ID"
              value={equipmentId}
              onChange={(event) => setEquipmentId(event.target.value)}
            />
          </div>
          <OvalButton
            label="Submit"
            style={{
              width: "25%",
            }}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default FacultyEquipmentForm;
