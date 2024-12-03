import React, { useEffect, useState } from "react";
import "./StudentHome.css";
import ReservationCard from "../reservation/ReservationCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { useUser } from "../../../context/user-context";

const StudentHome = () => {
  const { user } = useUser(); // Get the user object from UserContext
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [checkedInReservations, setCheckedInReservations] = useState([]); // Tracks reservations that have been checked in
  const [userId, setUserId] = useState(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!user || !user._id) return;

    // Fetch borrowed items
    const fetchBorrowedItems = async () => {
      try {
        console.log("Fetching borrowed items for user:", user._id); // Debug: Log the user ID

        const response = await fetch(`${BACKEND_URL}/user/${user._id}/equipment`, {
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
        console.log("Borrowed equipment fetched successfully:", data); // Debug: Log fetched data
        
        setBorrowedItems(data);
      } catch (error) {
        console.error('Error fetching borrowed items:', error);
      }
    };

    fetchBorrowedItems();
  }, [BACKEND_URL, user]);

  useEffect(() => {
    if (!user || !user._id) return;
  
    // Fetch reservations for the user
    const fetchReservations = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/reservation`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch reservation data");
        }
  
        const data = await response.json();
  
        // Log reservations and their user IDs for debugging
        console.log("Fetched reservations:", data);
  
        // Filter reservations to include only those for the logged-in user
        const userReservations = data.filter((reservation) => {
          const reservationUserId = reservation.user._id || reservation.user; // Handle both object and string cases
          console.log(`Reservation User ID: ${reservationUserId}`);
          console.log(`Current User ID: ${user._id}`);
          return reservationUserId === user._id;
        });
  
        console.log("Filtered reservations:", userReservations);
  
        setReservations(userReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
  
    fetchReservations();
  }, [BACKEND_URL, user]); 

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
    console.log("Check-in clicked for reservation:", reservationId);
    // Add the reservation ID to the list of checked-in reservations
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
            reservations.map((reservation) => (
              <ReservationCard
                key={reservation._id}
                roomName={`${reservation.room.number}`}
                choseDate={new Date(reservation.startTime).toISOString().split('T')[0]} // This shows the raw date in YYYY-MM-DD format
                startTime={new Date(reservation.startTime).toISOString().split('T')[1].slice(0, 5)} // This keeps the raw time in HH:MM format
                endTime={new Date(reservation.endTime).toISOString().split('T')[1].slice(0, 5)} // This keeps the raw time in HH:MM format
                onCheckIn={() => handleCheckInReservation(reservation._id)}
                onCancel={() => handleCancelReservation(reservation._id)}
                showButtons={!checkedInReservations.includes(reservation._id)} // Hide buttons if checked in
              />
            ))
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
                  <span>{item.type}</span>
                  <span>Due {new Date(item.dueDate).toLocaleDateString()}</span>
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

export default StudentHome;

