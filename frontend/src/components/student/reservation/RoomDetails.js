// RoomDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RoomDetails.css'; 


const RoomDetails = () => {
  const { roomId } = useParams(); 
  const navigate = useNavigate(); 

  const roomDetails = {
    id: 'LC323',
    capacity: '5 people',
    type: 'Group Study Room',
    noiseLevel: 'Active Collaborative Zone',
    features: ['Wifi', '2 Outlets', 'Whiteboard', 'TV monitor', 'Rolling chairs', 'Non-rolling table']
  };

  useEffect(() => {
    // Logic to fetch room details based on roomId
    // For now, we're using static data
  }, [roomId]);

  return (
    <div className="room-details-container">
      <div className="navigation">
        <button onClick={() => navigate(-1)} className="back-button">← Go back</button>
      </div>
      <div className="room-details-content">
        <div className="date-picker">
          <h2 className="section-title1">Choose a date and time</h2>
          {/* Placeholder for actual date-time picker */}
        </div>
        <div className="room-information">
        <h2 className="section-title2">Room Information</h2>
          <h3>Room Number: {roomDetails.id}</h3>
          <p><strong>Capacity:</strong> {roomDetails.capacity}</p>
          <p><strong>Room Type:</strong> {roomDetails.type}</p>
          <p><strong>Noise Level:</strong> {roomDetails.noiseLevel}</p>
          <div>
            <h3>Room Features:</h3>
            <ul>
              {roomDetails.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <button className="booking-button">Complete Booking</button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

