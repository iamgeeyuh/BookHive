import React from 'react';
import './ReservationCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark, faSquareCheck} from '@fortawesome/free-regular-svg-icons';

const ReservationCard = ({ showButtons, roomName, choseDate, startTime, endTime, onCheckIn, onCancel }) => (
  <div className="reservation-card">
    <div className="reservation-info">
    <div className="room-name">{roomName}</div>
    <div className="time-range">{choseDate} {startTime} - {endTime}</div>
 </div>
    {showButtons && (
      <>
      <button className="check-in-button" onClick={onCheckIn}>
      <FontAwesomeIcon icon={faSquareCheck} className='faSquareCheck'/>Check in
      </button>
      <button className="edit-cancel-button" onClick={onCancel}>
      <FontAwesomeIcon icon={faCircleXmark} className='faPenToSquare'/>Cancel
      </button>
      </>
    )}
  </div>
);

export default ReservationCard;
