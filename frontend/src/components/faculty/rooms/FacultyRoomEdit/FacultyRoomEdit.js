import "./FacultyRoomEdit.css";
import { FaArrowLeft } from "react-icons/fa";
import Dropdown from "../../../dropdown/Dropdown";
import Checkbox from "../../../checkbox/Checkbox";
import OvalButton from "../../../button/OvalButton/OvalButton";
import { useState } from "react";

const FacultyRoomEdit = ({ goBack }) => {
  const [roomData, setRoomData] = useState({
    number: "",
    status: "enabled",
    type: "individual",
    capacity: "1-2",
    noiseLevel: "quiet",
    features: [],
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleCheckboxChange = (selectedFeatures) => {
    setRoomData({ ...roomData, features: selectedFeatures });
  };

  const handleCreateRoom = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/room`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      if (response.ok) {
        alert("Room created successfully!");
        goBack();
      } 
    } catch (error) {
      console.error("Error creating room:", error);
      alert("An error occurred while creating the room.");
    }
  };

  return (
    <div className="faculty-room-edit-container">
      <div className="faculty-room-edit-header">
        <FaArrowLeft onClick={() => goBack()} style={{ cursor: "pointer" }} />
        <p>Create New Room</p>
      </div>
      <div className="faculty-room-edit-main">
        <div className="faculty-room-edit-left">
          <div className="faculty-room-edit-details">
            <div className="faculty-room-edit-input">
              <label>Room Number</label>
              <input
                type="text"
                placeholder="ex. LC323"
                onChange={handleInputChange}
                value={roomData.number}
                name="number"
              />
            </div>
            <Dropdown
              values={[
                { val: "enabled", name: "Enabled" },
                { val: "disabled", name: "Disabled" },
                { val: "large broken", name: "Broken" },
              ]}
              label="Status"
              onChange={(value) => {
                setRoomData({ ...roomData, status: value });
              }}
            />
          </div>
          <div className="faculty-room-edit-dropdowns">
            <Dropdown
              values={[
                { val: "individual", name: "Individual Study Room" },
                { val: "group", name: "Group Study Room" },
                { val: "large group", name: "Large Group Study Room" },
              ]}
              label="Room Type"
              onChange={(value) =>
                setRoomData({ ...roomData, type: value })
              }
            />
            <Dropdown
              values={[
                { val: "1-2", name: "1-2 People" },
                { val: "5", name: "5 People" },
                { val: "8", name: "8 People" },
              ]}
              label="Capacity"
              onChange={(value) =>
                setRoomData({ ...roomData, capacity: value })
              }
            />
            <Dropdown
              values={[
                { val: "quiet", name: "Quiet Zone" },
                { val: "moderate", name: "Moderate Noise Zone" },
                { val: "active", name: "Active/Collaboartive Zone" },
              ]}
              label="Noise Level"
              onChange={(value) =>
                setRoomData({ ...roomData, noiseLevel: value })
              }
            />
          </div>
        </div>
        <Checkbox
          values={[
            { val: "television", name: "Television" },
            { val: "outlet", name: "Outlet" },
            { val: "whiteboard", name: "Whiteboard" },
          ]}
          label="Features"
          style={{ marginTop: "2rem", marginLeft: "2rem" }}
          onChange={handleCheckboxChange}
          name="features"
        />
      </div>
      <div className="faculty-room-edit-description">
        <label>Description</label>
        <textarea
          rows="10"
          cols="50"
          value={roomData.description}
          onChange={handleInputChange}
          name="description"
        />
      </div>
      <div className="faculty-room-edit-buttons">
        <OvalButton
          label="Cancel"
          style={{ backgroundColor: "white" }}
          onClick={() => goBack()}
        />
        <OvalButton
          label="Save Changes"
          style={{ backgroundColor: "#AF5E36" }}
          onClick={handleCreateRoom}
        />
      </div>
    </div>
  );
};

export default FacultyRoomEdit;
