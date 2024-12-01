import React, { useState, useRef } from 'react';
import './StudentReservation.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faTv, faTablePicnic,faChairOffice,faBatteryFull,faChalkboard} from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome
// npm install react-datepicker
// npm install date-fns --save


const thirdFloorRooms = [
  { id: 'LC323', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC324', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv']},
  { id: 'LC325', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC326', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','outlet']},
  { id: 'LC328', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC329', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','outlet']},
  { id: 'LC330', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC331', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC332', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC333', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC334', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
];

const fourthFloorRooms = [
  { id: 'LC416', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},
  { id: 'LC417', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},
  { id: 'LC418', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},
  { id: 'LC419', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},
  { id: 'LC420', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},
  { id: 'LC421', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},
  { id: 'LC422', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},
  { id: 'LC423', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},
  { id: 'LC424', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},
  { id: 'LC425', capacity: 2, image: '/images/Dibner Individual Study Rooms.jpg', type: "Small", noiseLevel: "Low", features: ['outlet']},

  { id: 'LC432', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC434', capacity: 5, image: '/images/Dibner Group Study Rooms5.jpg', type: "Medium", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},

  { id: 'LC445', capacity: 8, image: '/images/Dibner Group Study Rooms8.jpg', type: "Large", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC445A', capacity: 8, image: '/images/Dibner Group Study Rooms8.jpg', type: "Large", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC445B', capacity: 8, image: '/images/Dibner Group Study Rooms8.jpg', type: "Large", noiseLevel: "Medium", features: ['whiteboard','tv','outlet']},
  { id: 'LC445C', capacity: 8, image: '/images/Dibner Group Study Rooms8.jpg', type: "Large", noiseLevel: "Medium",features: ['whiteboard','tv','outlet']},
];


const renderRoomFeatures = (features) => {
  const faIcons = {
    outlet: faBatteryFull,
    whiteboard: faChalkboard,
    tv: faTv,
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
  const navigate = useNavigate();
  const thirdFloorRef = useRef(null);
  const fourthFloorRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filteredThirdFloorRooms = thirdFloorRooms.filter(room => 
    (!capacityFilter || room.capacity === capacityFilter) &&
    (!typeFilter || room.type === typeFilter) &&
    (!noiseLevelFilter || room.noiseLevel === noiseLevelFilter)
  );

  const filteredFourthFloorRooms = fourthFloorRooms.filter(room => 
    (!capacityFilter || room.capacity === capacityFilter) &&
    (!typeFilter || room.type === typeFilter) &&
    (!noiseLevelFilter || room.noiseLevel === noiseLevelFilter)
  );

  const goToRoomDetails = roomId => {
    navigate(`/student/reservation/${roomId}`);
  };

  const scroll = (ref, direction) => {
    const scrollDistance = direction === 'left' ? -300 : 300;
    ref.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div className="reservation-container">
      <div className="filter-bar">
      <select onChange={e => setCapacityFilter(Number(e.target.value) || null)}>
           <option value="">Capacity</option>
           <option value="2">1-2 People</option>
           <option value="5">5 People</option>
           <option value="8">8 People</option>
         </select>
         <select onChange={e => setTypeFilter(e.target.value || null)}>
           <option value="">Type of space</option>
           <option value="Small">Individual Study Rooms</option>
           <option value="Medium">Group Study Rooms</option>
           <option value="Large">Large Group Study Rooms</option>
         </select>
         <select onChange={e => setNoiseLevelFilter(e.target.value || null)}>
           <option value="">Noise Level</option>
           <option value="Low">Quiet Zone</option>
           <option value="Medium">Moderate Noise Zone</option>
           <option value="High">Active Zone</option>
         </select>
        <button onClick={toggleDatePicker}>Choose a date and time</button>
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
           {filteredThirdFloorRooms.map(room => (
             <div key={room.id} className="room-card" onClick={() => goToRoomDetails(room.id)}>
               <img src={room.image} alt={`Room ${room.id}`} />
               <div className="room-info">
                 <h3>{room.id}</h3>
                 <p>(Capacity of {room.capacity})</p>
                 {renderRoomFeatures(room.features)}
               </div>
             </div>
           ))}
         </div>
         <button className="arrow right" onClick={() => scroll(thirdFloorRef, 'right')}>→</button>
       </div>
      
       <div className="floor-section">
       <button className="arrow left" onClick={() => scroll(fourthFloorRef, 'left')}>←</button>
         <div className="room-grid" ref={fourthFloorRef}>
           {filteredFourthFloorRooms.map(room => (
             <div key={room.id} className="room-card" onClick={() => goToRoomDetails(room.id)}>
               <img src={room.image} alt={`Room ${room.id}`} />
               <div className="room-info">
                 <h3>{room.id}</h3>
                 <p>(Capacity of {room.capacity})</p>
                 {renderRoomFeatures(room.features)}
               </div>
             </div>
           ))}
         </div>
         <button className="arrow right" onClick={() => scroll(fourthFloorRef, 'right')}>→</button>
       </div>
     </div>
   );
 };

export default StudentReservation;
