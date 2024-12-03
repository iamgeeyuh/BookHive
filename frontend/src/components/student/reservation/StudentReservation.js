import React, { useState, useEffect, useRef } from 'react';
import './StudentReservation.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faBatteryFull, faChalkboard } from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome
// npm install react-datepicker
// npm install date-fns --save

const renderRoomFeatures = (features) => {
  const faIcons = {
    Outlet: faBatteryFull,
    Whiteboard: faChalkboard,
    Television: faTv,
  };

  return features && features.length > 0 ? (
    <div className="room-features">
      {features.map(feature => (
        <FontAwesomeIcon key={feature} icon={faIcons[feature]} title={feature.charAt(0).toUpperCase() + feature.slice(1)} />
      ))}
    </div>
  ) : null;
};

const StudentReservation = () => {
  const [capacityFilter, setCapacityFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [noiseLevelFilter, setNoiseLevelFilter] = useState(null);
  const [thirdFloorRooms, setThirdFloorRooms] = useState([]);
  const [fourthFloorRooms, setFourthFloorRooms] = useState([]);
  const navigate = useNavigate();
  const thirdFloorRef = useRef(null);
  const fourthFloorRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        console.log("Fetching room data from the backend...");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/room`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Failed to fetch room data");
        }

        const rooms = await response.json();
        console.log("Room data fetched successfully:", rooms);

        // Splitting rooms into third and fourth floor (based on room number)
        const thirdFloor = rooms.filter(room => room.number.startsWith('LC3'));
        const fourthFloor = rooms.filter(room => room.number.startsWith('LC4'));

        setThirdFloorRooms(thirdFloor);
        setFourthFloorRooms(fourthFloor);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const filteredThirdFloorRooms = thirdFloorRooms.filter(room =>
    (!capacityFilter || parseInt(room.capacity, 10) === capacityFilter) &&
    (!typeFilter || room.type === typeFilter) &&
    (!noiseLevelFilter || room.noiseLevel === noiseLevelFilter)
  );

  const filteredFourthFloorRooms = fourthFloorRooms.filter(room =>
    (!capacityFilter || parseInt(room.capacity, 10) === capacityFilter) &&
    (!typeFilter || room.type === typeFilter) &&
    (!noiseLevelFilter || room.noiseLevel === noiseLevelFilter)
  );

  const goToRoomDetails = roomId => {
    console.log("Navigating to room details:", roomId);
    navigate(`/student/reservation/${roomId}`);
  };

  const scroll = (ref, direction) => {
    const scrollDistance = direction === 'left' ? -300 : 300;
    ref.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };

  const handleDateChange = date => {
    console.log("Selected date changed:", date);
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const getRoomImage = (roomNumber, capacity) => {
    const parsedCapacity = capacity ? parseInt(capacity, 10) : 0;
    console.log(`Determining image for Room Number: ${roomNumber}, Capacity: ${parsedCapacity}`);
    
    if (roomNumber.startsWith('LC3')) {
      return '/images/Dibner Group Study Rooms5.jpg';
    } else if (roomNumber.startsWith('LC4')) {
      if (parsedCapacity === 8) {
        return '/images/Dibner Group Study Rooms8.jpg';
      } else if (parsedCapacity === 5) {
        return '/images/Dibner Group Study Rooms5.jpg';
      }
      else {
        return '/images/Dibner Individual Study Rooms.jpg';
      }
    }
    return '/images/default-room-image.jpg';
  };

  return (
    <div className="reservation-container">
      <div className="filter-bar">
      <h3>Find by: </h3>
        <select onChange={e => setTypeFilter(e.target.value || null)}>
          <option value="">Type of space</option>
          <option value="Individual Study Room">Individual Study Rooms</option>
          <option value="Group Study Room">Group Study Rooms</option>
          <option value="Large Group Study Room">Large Group Study Rooms</option>
        </select>
        <select onChange={e => setCapacityFilter(e.target.value ? parseInt(e.target.value, 10) : null)}>
          <option value="">Capacity</option>
          <option value="2">1-2 People</option>
          <option value="5">5 People</option>
          <option value="8">8 People</option>
        </select>
        <select onChange={e => setNoiseLevelFilter(e.target.value || null)}>
          <option value="">Noise Level</option>
          <option value="Quiet Zone">Quiet Zone</option>
          <option value="Moderate Noise Zone">Moderate Zone</option>
          <option value="Active Zone">Active Zone</option>
        </select>
      </div>
      {showDatePicker && (
        <div className="date-picker-modal">
          <ReactDatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            inline
          />
        </div>
      )}

      <div className="floor-section">
        <button className="arrow left" onClick={() => scroll(thirdFloorRef, 'left')}>←</button>
        <div className="room-grid" ref={thirdFloorRef}>
          {filteredThirdFloorRooms.length > 0 ? (
            filteredThirdFloorRooms.map(room => (
              <div key={room._id} className="room-card" onClick={() => goToRoomDetails(room._id)}>
                <img src={getRoomImage(room.number, room.capacity)} alt={`Room ${room.number}`} />
                <div className="room-info">
                  <h3>{room.number}</h3>
                  <p>(Capacity of {room.capacity})</p>
                  {renderRoomFeatures(room.features)}
                </div>
              </div>
            ))
          ) : (
            <p>No rooms available for the selected criteria.</p>
          )}
        </div>
        <button className="arrow right" onClick={() => scroll(thirdFloorRef, 'right')}>→</button>
      </div>

      <div className="floor-section">
        <button className="arrow left" onClick={() => scroll(fourthFloorRef, 'left')}>←</button>
        <div className="room-grid" ref={fourthFloorRef}>
          {filteredFourthFloorRooms.length > 0 ? (
            filteredFourthFloorRooms.map(room => (
              <div key={room._id} className="room-card" onClick={() => goToRoomDetails(room._id)}>
                <img src={getRoomImage(room.number, room.capacity)} alt={`Room ${room.number}`} />
                <div className="room-info">
                  <h3>{room.number}</h3>
                  <p>(Capacity of {room.capacity})</p>
                  {renderRoomFeatures(room.features)}
                </div>
              </div>
            ))
          ) : (
            <p>No rooms available for the selected criteria.</p>
          )}
        </div>
        <button className="arrow right" onClick={() => scroll(fourthFloorRef, 'right')}>→</button>
      </div>
    </div>
  );
};

export default StudentReservation;
