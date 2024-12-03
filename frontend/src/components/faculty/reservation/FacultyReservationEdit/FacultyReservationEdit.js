import "./FacultyReservationEdit.css";
import { FaArrowLeft } from "react-icons/fa";
import Dropdown from "../../../dropdown/Dropdown";
import OvalButton from "../../../button/OvalButton/OvalButton";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [selectedDate, setSelectedDate] = useState(new Date()); // For date picker
  const [availableSlots, setAvailableSlots] = useState([]); // For time slots
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]); // Selected time slots
  const [buttonLabel, setButtonLabel] = useState("Create Reservation");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const convertToTwelveHour = (hour) => {
    if (hour == 0 || hour == 24) return "12:00AM";
    if (hour == 12) return "12:00PM";
    if (hour < 12) return `${hour}:00AM`;
    return `${hour % 12}:00PM`;
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/room`, {
          credentials: "include",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const roomData = await response.json();
          setRooms(roomData);

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
        const response = await fetch(`${BACKEND_URL}/user/student`, {
          credentials: "include",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);

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
  }, [BACKEND_URL]);

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
      setSelectedDate(new Date(reservationToEdit.startTime));
      setButtonLabel("Save Changes");
    }
  }, [reservationToEdit]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      console.log(reservationData.room);
      console.log(selectedDate.toISOString().slice(0, 10));
      try {
        const response = await fetch(
          `${BACKEND_URL}/reservation/${
            reservationData.room
          }?date=${selectedDate.toISOString().slice(0, 10)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reservation slots");
        }

        const reservations = await response.json();
        const takenSlots = [];

        reservations.forEach((reservation) => {
          const startHour = new Date(reservation.startTime).getHours();
          const endHour = new Date(reservation.endTime).getHours();

          for (let hour = startHour; hour < endHour; hour++) {
            takenSlots.push(hour);
          }
        });

        setAvailableSlots(takenSlots);
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    };

    if (reservationData.room) {
      fetchAvailableSlots();
    }
  }, [reservationData.room, selectedDate, BACKEND_URL]);

  const handleTimeSlotClick = (hour) => {
    if (selectedTimeSlots.includes(hour)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot !== hour));
    } else {
      if (selectedTimeSlots.length < 4 && !availableSlots.includes(hour)) {
        setSelectedTimeSlots([...selectedTimeSlots, hour]);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleCreateReservation = async () => {
    try {
      const startHour = selectedTimeSlots[0];
      const endHour = selectedTimeSlots[selectedTimeSlots.length - 1] + 1;

      const startTime = new Date(selectedDate);
      startTime.setHours(startHour, 0, 0, 0);

      const endTime = new Date(selectedDate);
      endTime.setHours(endHour, 0, 0, 0);

      const newReservationData = {
        ...reservationData,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      };

      console.log(newReservationData)

      const response = await fetch(`${BACKEND_URL}/reservation`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservationData),
      });

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
        `${BACKEND_URL}/reservation/${reservationToEdit._id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
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
        <p>Create New Reservation</p>
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
        </div>
        <div style={{ marginLeft: "5rem" }}>
          <ReactDatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setSelectedTimeSlots([]);
            }}
            inline
          />
        </div>

        <div
          className="time-slots"
          style={{
            paddingRight: "40rem",
            paddingLeft: "5rem",
            border: "none",
            boxShadow: "none",
          }}
        >
          <h3>Available Time Slots</h3>
          <ul>
            {[...Array(17).keys()].map((offset) => {
              var hour = offset + 7;
              return <li key={hour}>
                <button
                  className={
                    availableSlots.includes(hour)
                      ? "time-slot-button unavailable"
                      : selectedTimeSlots.includes(hour)
                      ? "time-slot-button selected"
                      : "time-slot-button"
                  }
                  disabled={availableSlots.includes(hour)}
                  onClick={() => handleTimeSlotClick(hour)}
                >
                  {convertToTwelveHour(hour)} - {convertToTwelveHour(hour + 1)}
                </button>
              </li>;
            })}
          </ul>
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
