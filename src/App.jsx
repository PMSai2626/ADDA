import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Confirmation from './Confirmation';
import './App.css';

function App() {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBooking = (facility, date, timeSlot) => { 
    const isBooked = checkBooking(facility, date, timeSlot);
    if (isBooked) {
      alert('Booking Failed, Already Booked');
      return;
    }

    const amount = calculateAmount(facility, timeSlot);
    if (amount !== null) {
      const newBooking = { facility, date, timeSlot, amount };
      setBookings([...bookings, newBooking]);
      setErrorMessage(''); // Clear error message if booking is successful
      console.log('Booked, Rs.', amount);
    } else {
      setErrorMessage('Error calculating amount');
    }
  };

  const checkBooking = (facility, date, timeSlot) => {
    const isOverlapping = bookings.some(booking => {
      if (booking.facility === facility && booking.date === date) {
        const [existingStart, existingEnd] = booking.timeSlot.split(' - ');
        const [selectedStart, selectedEnd] = timeSlot.split(' - ');
        const [existingStartHour] = existingStart.split(':').map(Number);
        const [existingEndHour] = existingEnd.split(':').map(Number);
        const [selectedStartHour] = selectedStart.split(':').map(Number);
        const [selectedEndHour] = selectedEnd.split(':').map(Number);

        if (
          (selectedStartHour >= existingStartHour && selectedStartHour < existingEndHour) ||
          (selectedEndHour > existingStartHour && selectedEndHour <= existingEndHour) ||
          (selectedStartHour <= existingStartHour && selectedEndHour >= existingEndHour)
        ) {
          return true; // Overlapping time slots found
        }
      }
      return false;
    });

    return isOverlapping;
  };

  const calculateAmount = (facility, timeSlot) => {
    const [startTime, endTime] = timeSlot.split(' - ');
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    let totalHours = (endHour + endMinute / 60) - (startHour + startMinute / 60);
    let amount = 0;

    if (facility === 'Clubhouse') {
      if ((startHour >= 10 && startHour < 16) || (startHour >= 16 && startHour < 22)) {
        amount = totalHours * 100;
      } else if (startHour  >= 16 &&  startHour < 22) {
        const remainingHours = (endHour + endMinute / 60) - 16;
        const regularHours = totalHours - remainingHours;
        amount = (regularHours * 100) + (remainingHours * 500);
      }
    } else if (facility === 'Tennis Court') {
      amount = totalHours * 50;
    }

    if (amount <= 0 || isNaN(amount)) {
      console.error('Error calculating amount');
      return null;
    }

    return amount;
  };

  return (
    <div className="app-container">
      <h1>Apartment Facility Booking System</h1>
      <BookingForm onBooking={handleBooking} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {bookings.map((booking, index) => (
        <Confirmation key={index} booking={booking} />
      ))}
    </div>
  );
}

export default App;
