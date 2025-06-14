import React, { useState, useEffect } from 'react';
import '../styles/MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem('appointments');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <div className="booking-header">
                <h3>{booking.appointmentType}</h3>
                <span className={`status ${booking.status || 'pending'}`}>
                  {booking.status || 'Pending'}
                </span>
              </div>
              <div className="booking-details">
                <p><strong>Date:</strong> {formatDate(booking.appointmentDate)}</p>
                <p><strong>Time:</strong> {booking.appointmentTime}</p>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Contact:</strong> {booking.phone}</p>
                {booking.message && (
                  <p><strong>Notes:</strong> {booking.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings; 