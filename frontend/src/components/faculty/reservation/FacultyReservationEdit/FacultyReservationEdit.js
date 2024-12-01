import "./FacultyReservationEdit.css";
import { FaArrowLeft } from "react-icons/fa";
import Dropdown from "../../../dropdown/Dropdown";
import OvalButton from "../../../button/OvalButton/OvalButton";
import { useState, useEffect } from "react";

const FacultyReservationEdit = ({ goBack, reservationToEdit }) => {
  const [reservationData, setReservationData] = useState({
    room: "",
    user: "",
    startTime: "",
    endTime: "",
  });

  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [pageTitle, setPageTitle] = useState("Create New Reservation");
  const [buttonLabel, setButtonLabel] = useState("Create Reservation");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/room`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const roomData = await response.json();
          setRooms(roomData);

          // Set default room to the first in the list if available
          if (roomData.length > 0) {
            setReservationData((prevData) => ({
              ...prevData,
              room: roomData[0]._id,
            }));
          }
        } else {
          console.error("Failed to fetch rooms");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/student`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUsers(userData);

          // Set default user to the first in the list if available
          if (userData.length > 0) {
            setReservationData((prevData) => ({
              ...prevData,
              user: userData[0]._id,
            }));
          }
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchRooms();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (reservationToEdit) {
      setReservationData({
        room: reservationToEdit.room._id,
        user: reservationToEdit.user._id,
        startTime: new Date(reservationToEdit.startTime)
          .toISOString()
          .slice(0, 16),
        endTime: new Date(reservationToEdit.endTime).toISOString().slice(0, 16),
      });
      setButtonLabel("Save Changes");
    }
  }, [reservationToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleCreateReservation = async () => {
    console.log(reservationData);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reservation`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (response.ok) {
        alert("Reservation created successfully!");
        goBack();
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("An error occurred while creating the reservation.");
    }
  };

  const handleUpdateReservation = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reservation/${reservationToEdit._id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (response.ok) {
        alert("Reservation updated successfully!");
        goBack();
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
      alert("An error occurred while updating the reservation.");
    }
  };

  return (
    <div className="faculty-reservation-edit-container">
      <div className="faculty-reservation-edit-header">
        <FaArrowLeft onClick={() => goBack()} style={{ cursor: "pointer" }} />
        <p>{pageTitle}</p>
      </div>
      <div className="faculty-reservation-edit-main">
        <div className="faculty-reservation-edit-inputs">
          <Dropdown
            values={rooms.map((room) => ({ val: room._id, name: room.number }))}
            label="Room"
            onChange={(value) =>
              setReservationData({ ...reservationData, room: value })
            }
            value={reservationData.room._id}
          />
          <Dropdown
            values={users.map((user) => ({
              val: user._id,
              name: user.email,
            }))}
            label="User"
            onChange={(value) =>
              setReservationData({ ...reservationData, user: value })
            }
            value={reservationData.user._id}
          />
          <div className="faculty-reservation-edit-datetime">
            <label>Start Time</label>
            <input
              type="datetime-local"
              onChange={handleInputChange}
              value={reservationData.startTime}
              name="startTime"
            />
          </div>
          <div className="faculty-reservation-edit-datetime">
            <label>End Time</label>
            <input
              type="datetime-local"
              onChange={handleInputChange}
              value={reservationData.endTime}
              name="endTime"
            />
          </div>
        </div>
      </div>
      <div className="faculty-reservation-edit-buttons">
        <OvalButton
          label="Cancel"
          style={{ backgroundColor: "white" }}
          onClick={() => goBack()}
        />
        <OvalButton
          label={buttonLabel}
          style={{ backgroundColor: "#AF5E36", color: "white" }}
          onClick={() => {
            reservationToEdit
              ? handleUpdateReservation()
              : handleCreateReservation();
          }}
        />
      </div>
    </div>
  );
};

export default FacultyReservationEdit;
