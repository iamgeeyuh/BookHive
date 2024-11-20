import "./FacultyRoomEdit.css";
import { FaArrowLeft } from "react-icons/fa";
import Dropdown from "../../../dropdown/Dropdown";
import Checkbox from "../../../checkbox/Checkbox";
import OvalButton from "../../../button/OvalButton/OvalButton";
import { useState, useEffect } from "react";

const FacultyRoomEdit = ({ goBack, roomToEdit }) => {
  const [roomData, setRoomData] = useState({
    number: "",
    status: "Enabled",
    type: "Individual Study Room",
    capacity: "1-2",
    noiseLevel: "Quiet Zone",
    features: [],
    description: "",
  });

  const [pageTitle, setPageTitle] = useState("Create New Room");
  const [buttonLabel, setButtonLabel] = useState("Create Room");

  useEffect(() => {
    if (roomToEdit) {
      setRoomData(roomToEdit);
      setPageTitle(`Edit Room: ${roomToEdit.number}`);
      setButtonLabel("Save Changes");
    }
  }, [roomToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleCheckboxChange = (selectedFeatures) => {
    setRoomData({ ...roomData, features: selectedFeatures });
  };

  const handleCreateRoom = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/room`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomData),
        }
      );

      if (response.ok) {
        alert("Room created successfully!");
        goBack();
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert("An error occurred while creating the room.");
    }
  };

  const handleUpdateRoom = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/room/${roomToEdit._id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomData),
        }
      );

      if (response.ok) {
        alert("Room updated successfully!");
        goBack();
      }
    } catch (error) {
      console.error("Error updating room:", error);
      alert("An error occurred while updating the room.");
    }
  };

  return (
    <div className="faculty-room-edit-container">
      <div className="faculty-room-edit-header">
        <FaArrowLeft onClick={() => goBack()} style={{ cursor: "pointer" }} />
        <p>{pageTitle}</p>
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
                { val: "Enabled", name: "Enabled" },
                { val: "Disabled", name: "Disabled" },
                { val: "Broken", name: "Broken" },
              ]}
              label="Status"
              onChange={(value) => {
                setRoomData({ ...roomData, status: value });
              }}
              value={roomData.status}
            />
          </div>
          <div className="faculty-room-edit-dropdowns">
            <Dropdown
              values={[
                { val: "Individual Study Room", name: "Individual Study Room" },
                { val: "Group Study Room", name: "Group Study Room" },
                {
                  val: "Large Group Study Room",
                  name: "Large Group Study Room",
                },
              ]}
              label="Room Type"
              onChange={(value) => setRoomData({ ...roomData, type: value })}
              value={roomData.type}
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
              value={roomData.capacity}
            />
            <Dropdown
              values={[
                { val: "Quiet Zone", name: "Quiet Zone" },
                { val: "Moderate Noise Zone", name: "Moderate Noise Zone" },
                {
                  val: "Active/Collaborative Zone",
                  name: "Active/Collaborative Zone",
                },
              ]}
              label="Noise Level"
              onChange={(value) =>
                setRoomData({ ...roomData, noiseLevel: value })
              }
              value={roomData.noiseLevel}
            />
          </div>
        </div>
        <Checkbox
          values={[
            { val: "Television", name: "Television" },
            { val: "Outlet", name: "Outlet" },
            { val: "whiteWhiteboardboard", name: "Whiteboard" },
          ]}
          label="Features"
          style={{ marginTop: "2rem", marginLeft: "2rem" }}
          onChange={handleCheckboxChange}
          name="features"
          value={roomData.features}
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
          label={buttonLabel}
          style={{ backgroundColor: "#AF5E36", color: "white" }}
          onClick={() => {
            roomToEdit ? handleUpdateRoom() : handleCreateRoom();
          }}
        />
      </div>
    </div>
  );
};

export default FacultyRoomEdit;
