// BookingForm.js
import React, { useState } from 'react';

function BookingForm({ onBooking }) {
  const [facility, setFacility] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleFacilityChange = (event) => {
    setFacility(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const timeSlot = `${startTime} - ${endTime}`;
    onBooking(facility, date, timeSlot);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Facility:
        <select value={facility} onChange={handleFacilityChange}>
          <option value="">Select Facility</option>
          <option value="Clubhouse">Clubhouse</option>
          <option value="Tennis Court">Tennis Court</option>
        </select>
      </label>
      <br />
      <label>
        Date:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <br />
      <label>
        Start Time:
        <input type="time" value={startTime} onChange={handleStartTimeChange} />
      </label>
      <br />
      <label>
        End Time:
        <input type="time" value={endTime} onChange={handleEndTimeChange} />
      </label>
      <br />
      <button type="submit">Book Facility</button>
    </form>
  );
}

export default BookingForm;
