// Confirmation.js
import React from 'react';

function Confirmation({ booking }) {
  return (
    <div>
      <h2>Booking Confirmation</h2>
      <p>Facility: {booking.facility}</p>
      <p>Date: {booking.date}</p>
      <p>Time Slot: {booking.timeSlot}</p>
      <p>Amount: Rs. {booking.amount}</p>
    </div>
  );
}

export default Confirmation;
