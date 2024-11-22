import { useEffect, useState } from "react";
import "./FacultyRoomTable.css";

const FacultyRoomTable = ({ setRoomToEdit, setEdit }) => {
  const [rooms, setRooms] = useState([]);

  const loadRooms = async () => {
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
        const data = await response.json();
        setRooms(data);
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert("An error occurred while loading rooms.");
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div style={{overflowY: "auto", height: "95%"}}>
      <table className="faculty-room-table-container">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Capacity</th>
            <th>Room Type</th>
            <th>Noise Level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <tr
                key={room.number}
                onClick={() => {
                  setEdit(true);
                  setRoomToEdit(room);
                }}
              >
                <td>{room.number}</td>
                <td>{room.capacity}</td>
                <td>{room.type}</td>
                <td>{room.noiseLevel}</td>
                <td>{room.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                There are no rooms.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyRoomTable;
