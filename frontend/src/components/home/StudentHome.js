// StudentHomePage.js
import React, { useEffect, useState } from "react";
import "./StudentHome.css";
import ReservationCard from "../reservation/ReservationCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';

const mockBorrowedItems = [
  { name: "MacBook Charger", dueDate: "7PM 9/30/24" },
  { name: "Whiteboard Marker", dueDate: "7PM 9/30/24" },
  { name: "Board Game", dueDate: "7PM 9/30/24" },
  { name: "Physic 1 TextBook", dueDate: "7PM 9/30/24" },
  { name: "MacBook Charger", dueDate: "7PM 9/30/24" },
  { name: "Whiteboard Marker", dueDate: "7PM 9/30/24" },
  { name: "Board Game", dueDate: "7PM 9/30/24" },
  { name: "Physic 1 TextBook", dueDate: "7PM 9/30/24" },
];

const StudentHome = () => {
  const [borrowedItems, setBorrowedItems] = useState(mockBorrowedItems);

  useEffect(() => {
    // Fetch data from an API
    // setBorrowedItems(fetchedData);
  }, []);

  return (
    <div className="student-home">
      <div className="content-wrapper">
        <div className="reservations-section">
          <h2 className="section-title">
          <FontAwesomeIcon icon={faCalendarCheck} className="checked-calendar"/>
          Upcoming Reservations</h2>
          {[...Array(4)].map((_, index) => (
            <ReservationCard
              key={index}
              roomName="LC323 (Capacity of 5)"
              choseDate = "9/28/24"
              startTime="10AM"
              endTime="1PM"
              onCheckIn={() => console.log("Check-in clicked")}
              onCancel={() => console.log("Edit/Cancel clicked")}
            />
          ))}
        </div>
        <div className="borrowed-section">
          <h2 className="section-title">
          <FontAwesomeIcon icon={faMicroscope} className="microscope-icon"/>
          Borrowed Equipments</h2>
          <ul className="borrowed-list">
            {borrowedItems.map((item, index) => (
              <li key={index} className="borrowed-item">
                <span>{item.name}</span>
                <span>Due {item.dueDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
