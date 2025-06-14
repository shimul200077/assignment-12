import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import patientBookingsData from '../data/patientBookings.json';

const PatientBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setBookings(patientBookingsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookings.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading patient bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="patient-bookings-container">
      <section className="patient-bookings-hero">
        <div className="patient-bookings-hero-content">
          <h1>Patient Bookings</h1>
          <p>View all your scheduled appointments</p>
        </div>
      </section>

      <div className="patient-bookings-content">
        {bookings.length > 0 ? (
          <div className="bookings-table-container">
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Service Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>
                      <Link to={`/patients/${booking.patientName.replace(/ /g, '-')}`} className="patient-name-link">
                        {booking.patientName}
                      </Link>
                    </td>
                    <td>{booking.doctorName}</td>
                    <td>{booking.serviceType}</td>
                    <td>{booking.appointmentDate}</td>
                    <td>{booking.appointmentTime}</td>
                    <td className={`booking-status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-bookings-message">
            <i className="fas fa-calendar-times"></i>
            <p>No appointments found.</p>
            <p>Book an appointment to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientBookings; 