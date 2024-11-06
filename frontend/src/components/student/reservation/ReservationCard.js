import React from 'react';
import './ReservationCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareCheck} from '@fortawesome/free-regular-svg-icons';
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons';


const ReservationCard = ({ roomName, choseDate, startTime, endTime, onCheckIn, onCancel }) => {
  return (
    <div className="reservation-card">
      <div className="reservation-info">
        <div className="room-name">{roomName}</div>
        <div className="time-range">{choseDate} {startTime} - {endTime}</div>
      </div>
      <div className="reservation-actions">
        <button className="check-in-button" onClick={onCheckIn}>
        <FontAwesomeIcon icon={faSquareCheck} className='faSquareCheck'/>Check in</button>
        <button className="edit-cancel-button" onClick={onCancel}>
        <FontAwesomeIcon icon={faPenToSquare} className='faPenToSquare'/>Edit/Cancel</button>
      </div>
    </div>
  );
};

export default ReservationCard;
