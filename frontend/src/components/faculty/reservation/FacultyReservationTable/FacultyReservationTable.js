import { useEffect, useState } from "react";
import "./FacultyReservationTable.css";

const FacultyReservationTable = ({ setReservationToEdit, setEdit }) => {
  const [reservations, setReservations] = useState([]);

  const loadReservations = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reservation`,
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
        setReservations(data);
      }
    } catch (error) {
      console.error("Error loading reservations:", error);
      alert("An error occurred while loading reservations.");
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div style={{ overflowY: "auto", height: "95%" }}>
      <table className="faculty-reservation-table-container">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Reserved For</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr
                key={reservation._id}
                onClick={() => {
                  setEdit(true);
                  setReservationToEdit(reservation);
                }}
              >
                <td>{reservation.room.number}</td>
                <td>
                  {reservation.user.firstName} {reservation.user.lastName}
                </td>
                <td>{new Date(reservation.startTime).toLocaleString()}</td>
                <td>{new Date(reservation.endTime).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                There are no reservations.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyReservationTable;