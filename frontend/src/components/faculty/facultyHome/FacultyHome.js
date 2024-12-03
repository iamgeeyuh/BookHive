import React, { useEffect, useState } from "react";
import ReservationCard from "../../student/reservation/ReservationCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import moment from "moment";

const FacultyHome = () => {
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [checkedInReservations, setCheckedInReservations] = useState([]); // Tracks reservations that have been checked in

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchBorrowedItems = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/equipment/borrowed`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch borrowed equipment data");
        }

        const data = await response.json();
        console.log(data)
        setBorrowedItems(data);
      } catch (error) {
        console.error('Error fetching borrowed items:', error);
      }
    };

    fetchBorrowedItems();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/reservation`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reservation data");
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  // Handle reservation cancellation
  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/reservation/${reservationId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }

      console.log("Reservation deleted successfully");
      // Remove the deleted reservation from the UI
      setReservations(prevReservations => prevReservations.filter(res => res._id !== reservationId));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  // Handle check-in action
  const handleCheckInReservation = (reservationId) => {
    setCheckedInReservations((prevCheckedIn) => {
      if (!prevCheckedIn.includes(reservationId)) {
        return [...prevCheckedIn, reservationId];
      }
      return prevCheckedIn;
    });
  };

  return (
    <div className="student-home">
      <div className="content-wrapper">
        <div className="reservations-section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faCalendarCheck} className="checked-calendar" />
            Upcoming Reservations
          </h2>
          {reservations.length > 0 ? (
            reservations.map((reservation) => {
              // Create Date objects and manually extract the required parts
              const formattedStartTime = moment(reservation.startTime).local().format("MMM DD, YYYY, h A");

              const formattedEndTime = moment(reservation.endTime).local().format("h A");

              console.log("Original Start Time:", reservation.startTime);
              console.log("Original End Time:", reservation.endTime);
              console.log("Formatted Start Time (No Conversion):", formattedStartTime);
              console.log("Formatted End Time (No Conversion):", formattedEndTime);

              return (
                <ReservationCard
                  key={reservation._id}
                  roomName={`${reservation.room.number}`}
                  choseDate={`${formattedStartTime} - ${formattedEndTime}`} // Combine start and end times
                  onCheckIn={() => handleCheckInReservation(reservation._id)}
                  onCancel={() => handleCancelReservation(reservation._id)}
                  showButtons={!checkedInReservations.includes(reservation._id)} // Hide buttons if checked in
                />
              );
            })
          ) : (
            <p>No upcoming reservations found.</p>
          )}
        </div>
        <div className="borrowed-section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faMicroscope} className="microscope-icon" />
            Borrowed Equipments
          </h2>
          <ul className="borrowed-list">
            {borrowedItems.length > 0 ? (
              borrowedItems.map((item, index) => (
                <li key={index} className="borrowed-item">
                  <span style={{fontWeight: "bold"}}>{item.equipment.type}: {item.user.email.split("@")[0]}</span>
                  <span>Due {new Date(item.equipment.dueDate).toLocaleDateString()}</span>
                </li>
              ))
            ) : (
              <p>No borrowed equipment found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;

