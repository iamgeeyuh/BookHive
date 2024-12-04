// // RoomDetails.js
// // npm install react-datepicker

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './RoomDetails.css';
// import { useUser } from '../../../context/user-context';

// const RoomDetails = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//   const { user } = useUser(); // Get the current user context

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [roomDetails, setRoomDetails] = useState({});
//   const [popupStatus, setPopupStatus] = useState(null); // Status for showing success or failure popup

//   useEffect(() => {
//     const fetchRoomDetails = async () => {
//       try {
//         console.log("Fetching room details for room ID:", roomId);
//         const response = await fetch(`${BACKEND_URL}/room/${roomId}`, {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch room details');
//         }

//         const roomData = await response.json();
//         console.log("Fetched room details:", roomData);
//         setRoomDetails(roomData);
//       } catch (error) {
//         console.error('Error fetching room details:', error);
//       }
//     };

//     fetchRoomDetails();
//   }, [roomId, BACKEND_URL]);

//   useEffect(() => {
//     const fetchAvailableSlots = async () => {
//       try {
//         console.log("Fetching reservation slots for room ID:", roomId, "and date:", selectedDate.toISOString().slice(0, 10));
//         const response = await fetch(
//           `${BACKEND_URL}/reservation?roomId=${roomId}&date=${selectedDate.toISOString().slice(0, 10)}`,
//           {
//             method: 'GET',
//             credentials: 'include',
//           }
//         );

//         if (!response.ok) {
//           throw new Error('Failed to fetch reservation slots');
//         }

//         const reservations = await response.json();
//         console.log("Fetched reservations:", reservations);

//         const takenSlots = [];

//         reservations
//           .filter(reservation => reservation.room._id === roomId)
//           .forEach(reservation => {
//             const startDate = new Date(reservation.startTime);
//             const endDate = new Date(reservation.endTime);

//             const reservationDate = startDate.toISOString().slice(0, 10);
//             const selectedDateString = selectedDate.toISOString().slice(0, 10);

//             if (reservationDate === selectedDateString) {
//               const startHour = startDate.getUTCHours();
//               const endHour = endDate.getUTCHours();

//               console.log(`Reservation found for room ID ${roomId}: Start Time = ${reservation.startTime}, End Time = ${reservation.endTime}`);
//               console.log(`Processed Hours: From ${startHour} to ${endHour}`);

//               for (let hour = startHour; hour < endHour; hour++) {
//                 takenSlots.push(hour);
//               }
//             }
//           });

//         console.log("Hours marked as unavailable:", takenSlots);
//         setAvailableSlots(takenSlots);
//       } catch (error) {
//         console.error('Error fetching available slots:', error);
//       }
//     };

//     fetchAvailableSlots();
//   }, [roomId, selectedDate, BACKEND_URL]);

//   const handleBookingClick = () => {
//     if (selectedTimeSlots.length > 0) {
//       setShowModal(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleConfirmBooking = async () => {
//     try {
//       console.log("Confirming reservation...");

//       // Construct start and end times based on the selected date and time slots
//       let startHour = selectedTimeSlots[0];
//       let endHour = selectedTimeSlots[selectedTimeSlots.length - 1] + 1;

//       // Hardcode adjustment to subtract 5 hours before saving to the database
//       startHour = (startHour - 5 + 24) % 24; // Adjusting the hour and ensuring it stays within 0-23 range
//       endHour = (endHour - 5 + 24) % 24;

//       // Create the start and end Date objects with adjusted local time
//       const startTime = new Date(selectedDate);
//       startTime.setHours(startHour, 0, 0, 0); // Set hours, minutes, seconds, milliseconds

//       const endTime = new Date(selectedDate);
//       endTime.setHours(endHour, 0, 0, 0); // Set hours, minutes, seconds, milliseconds

//       // Prepare the reservation data
//       const reservationData = {
//         room: roomId,
//         user: user._id,
//         startTime: startTime.toISOString(),
//         endTime: endTime.toISOString(),
//       };

//       // Send the reservation request
//       const response = await fetch(`${BACKEND_URL}/reservation`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(reservationData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create reservation');
//       }

//       console.log("Reservation created successfully!");
//       setPopupStatus('success');
//     } catch (error) {
//       console.error("Error creating reservation:", error);
//       setPopupStatus('failure');
//     } finally {
//       setShowModal(false);
//     }
//   };

//   const handleTimeSlotClick = (hour) => {
//     if (selectedTimeSlots.includes(hour)) {
//       setSelectedTimeSlots(selectedTimeSlots.filter(slot => slot !== hour));
//     } else {
//       if (selectedTimeSlots.length < 4 && !availableSlots.includes(hour)) {
//         setSelectedTimeSlots([...selectedTimeSlots, hour]);
//       }
//     }
//   };

//   const areSlotsConsecutive = (slots) => {
//     const sortedSlots = [...slots].sort((a, b) => a - b);
//     for (let i = 1; i < sortedSlots.length; i++) {
//       if (sortedSlots[i] !== sortedSlots[i - 1] + 1) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleClosePopup = () => {
//     setPopupStatus(null);
//   };

//   return (
//     <div className="room-details-container">
//       <div className="navigation">
//         <button onClick={() => navigate(-1)} className="back-button">← Go back</button>
//       </div>
//       <div className="room-details-content">
//         <div className="date-time-container">
//           <h2 className="section-title1">Choose a date and time</h2>
//           <div className="date-time-picker-wrapper">
//             <div className="date-picker">
//               <ReactDatePicker
//                 selected={selectedDate}
//                 onChange={date => {
//                   setSelectedDate(date);
//                   setSelectedTimeSlots([]);
//                 }}
//                 inline
//               />
//             </div>
//             <div className="time-slots">
//               <h3>Available Time Slots</h3>
//               <ul>
//                 {[...Array(24).keys()].map(hour => (
//                   <li key={hour}>
//                     <button
//                       className={
//                         availableSlots.includes(hour)
//                           ? 'time-slot-button unavailable'
//                           : selectedTimeSlots.includes(hour)
//                             ? 'time-slot-button selected'
//                             : 'time-slot-button'
//                       }
//                       disabled={availableSlots.includes(hour)}
//                       onClick={() => handleTimeSlotClick(hour)}
//                     >
//                       {hour}:00 - {hour + 1}:00
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="room-information">
//           <h2 className="section-title2">Room Information</h2>
//           <h3>Room Number: {roomDetails.number}</h3>
//           <p><strong>Capacity:</strong> {roomDetails.capacity}</p>
//           <p><strong>Room Type:</strong> {roomDetails.type}</p>
//           <p><strong>Noise Level:</strong> {roomDetails.noiseLevel}</p>
//           <div>
//             <h3>Room Features:</h3>
//             <ul>
//               {roomDetails.features && roomDetails.features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//           </div>
//           <button className="booking-button" onClick={handleBookingClick}>Complete Booking</button>
//         </div>
//       </div>

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <button className="close-button" onClick={handleCloseModal}>✖</button>
//             <h3>Confirm the following room reservation</h3>
//             <p><strong>Room Number:</strong> {roomDetails.number}</p>
//             <p><strong>N Number:</strong> N14530047</p>
//             <p><strong>Selected Date:</strong> {selectedDate.toLocaleDateString()}</p>
//             {areSlotsConsecutive(selectedTimeSlots) && selectedTimeSlots.length > 1 ? (
//               <>
//                 <p><strong>Reservation Start:</strong> {selectedTimeSlots[0]}:00</p>
//                 <p><strong>Reservation End:</strong> {selectedTimeSlots[selectedTimeSlots.length - 1] + 1}:00</p>
//               </>
//             ) : (
//               <>
//                 <p><strong>Selected Time Slots:</strong></p>
//                 <ul>
//                   {selectedTimeSlots.sort((a, b) => a - b).map(hour => (
//                     <li key={hour}>
//                       {hour}:00 - {hour + 1}:00
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//             <div className="modal-buttons">
//               <button onClick={handleCloseModal} className="cancel-button">Cancel</button>
//               <button className="confirm-button" onClick={handleConfirmBooking}>Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {popupStatus && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <h3>{popupStatus === 'success' ? 'Reservation successful!' : 'Failed to create reservation'}</h3>
//             <button onClick={handleClosePopup} className="popup-ok-button">OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoomDetails;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RoomDetails.css";
import { useUser } from "../../../context/user-context";

const RoomDetails = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const { user } = useUser(); // Get the current user context

  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // Set to midnight
    return date;
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState({});
  const [popupStatus, setPopupStatus] = useState(null); // Status for showing success or failure popup

  const convertToTwelveHour = (hour) => {
    if (hour == 0 || hour == 24) return "12AM";
    if (hour == 12) return "12PM";
    if (hour < 12) return `${hour}AM`;
    return `${hour % 12}PM`;
  };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        console.log("Fetching room details for room ID:", roomId);
        const response = await fetch(`${BACKEND_URL}/room/${roomId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch room details");
        }

        const roomData = await response.json();
        console.log("Fetched room details:", roomData);
        setRoomDetails(roomData);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId, BACKEND_URL]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {

        // Use the constructed localDateString for your API call to avoid timezone issues
        const response = await fetch(
          `${BACKEND_URL}/reservation/${roomId}?date=${selectedDate.toISOString().slice(0, 10)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reservation slots");
        }

        const reservations = await response.json();
        console.log("Fetched reservations:", reservations);

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
    fetchAvailableSlots();
  }, [roomId, selectedDate, BACKEND_URL]);

  const handleBookingClick = () => {
    if (selectedTimeSlots.length > 0) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmBooking = async () => {
    try {
      console.log("Confirming reservation...");

      // Construct start and end times based on the selected date and time slots
      let startHour = selectedTimeSlots[0];
      let endHour = selectedTimeSlots[selectedTimeSlots.length - 1] + 1;

      // Create the start and end Date objects with adjusted local time
      const startTime = new Date(selectedDate);
      startTime.setHours(startHour, 0, 0, 0); // Set hours, minutes, seconds, milliseconds

      const endTime = new Date(selectedDate);
      endTime.setHours(endHour, 0, 0, 0); // Set hours, minutes, seconds, milliseconds

      // Prepare the reservation data
      const reservationData = {
        room: roomId,
        user: user._id,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      };

      console.log(reservationData)

      // Send the reservation request
      const response = await fetch(`${BACKEND_URL}/reservation`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      console.log("Reservation created successfully!");
      setPopupStatus("success");
    } catch (error) {
      console.error("Error creating reservation:", error);
      setPopupStatus("failure");
    } finally {
      setShowModal(false);
    }
  };

  const handleTimeSlotClick = (hour) => {
    if (selectedTimeSlots.includes(hour)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot !== hour));
    } else {
      if (selectedTimeSlots.length < 4 && !availableSlots.includes(hour)) {
        setSelectedTimeSlots([...selectedTimeSlots, hour]);
      }
    }
    console.log(selectedTimeSlots)
  };

  const areSlotsConsecutive = (slots) => {
    const sortedSlots = [...slots].sort((a, b) => a - b);
    for (let i = 1; i < sortedSlots.length; i++) {
      if (sortedSlots[i] !== sortedSlots[i - 1] + 1) {
        return false;
      }
    }
    return true;
  };

  const handleClosePopup = () => {
    setPopupStatus(null);
  };

  return (
    <div className="room-details-container">
      <div className="navigation">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Go back
        </button>
      </div>
      <div className="room-details-content">
        <div className="date-time-container">
          <h2 className="section-title1">Choose a date and time</h2>
          <div className="date-time-picker-wrapper">
            <div className="date-picker">
              <ReactDatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTimeSlots([]);
                }}
                inline
              />
            </div>
            <div className="time-slots">
              <h3>Available Time Slots</h3>
              <ul>
                {[...Array(17).keys()].map((offset) => {
                  var hour = offset + 7;
                  return (
                    <li key={hour}>
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
                        {convertToTwelveHour(hour)} - {" "}
                        {convertToTwelveHour(hour + 1)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="room-information">
          <h2 className="section-title2">Room Information</h2>
          <h3>Room Number: {roomDetails.number}</h3>
          <p>
            <strong>Capacity:</strong> {roomDetails.capacity}
          </p>
          <p>
            <strong>Room Type:</strong> {roomDetails.type}
          </p>
          <p>
            <strong>Noise Level:</strong> {roomDetails.noiseLevel}
          </p>
          <div>
            <h3>Room Features:</h3>
            <ul>
              {roomDetails.features &&
                roomDetails.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
            </ul>
          </div>
          <button className="booking-button" onClick={handleBookingClick}>
            Complete Booking
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleCloseModal}>
              ✖
            </button>
            <h3>Confirm the following room reservation</h3>
            <p>
              <strong>Room Number:</strong> {roomDetails.number}
            </p>
            <p>
              <strong>N Number:</strong> N14530047
            </p>
            <p>
              <strong>Selected Date:</strong>{" "}
              {selectedDate.toLocaleDateString()}
            </p>
            {areSlotsConsecutive(selectedTimeSlots) &&
            selectedTimeSlots.length > 1 ? (
              <>
                <p>
                  <strong>Reservation Start:</strong> {selectedTimeSlots[0]}:00
                </p>
                <p>
                  <strong>Reservation End:</strong>{" "}
                  {selectedTimeSlots[selectedTimeSlots.length - 1] + 1}:00
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Selected Time Slots:</strong>
                </p>
                <ul>
                  {selectedTimeSlots
                    .sort((a, b) => a - b)
                    .map((hour) => (
                      <li key={hour}>
                        {convertToTwelveHour(hour)} - {" "}
                        {convertToTwelveHour(hour + 1)}
                      </li>
                    ))}
                </ul>
              </>
            )}
            <div className="modal-buttons">
              <button onClick={handleCloseModal} className="cancel-button">
                Cancel
              </button>
              <button className="confirm-button" onClick={handleConfirmBooking}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {popupStatus && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>
              {popupStatus === "success"
                ? "Reservation successful!"
                : "Failed to create reservation"}
            </h3>
            <button onClick={handleClosePopup} className="popup-ok-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
