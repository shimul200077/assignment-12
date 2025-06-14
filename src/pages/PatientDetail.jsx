import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import patientBookingsData from '../data/patientBookings.json';

const PatientDetail = () => {
  const { patientName } = useParams();
  const [patientBookings, setPatientBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientBookings = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const normalizedPatientName = patientName.replace(/-/g, ' ').toLowerCase();
        const filteredBookings = patientBookingsData.filter(
          booking => booking.patientName.toLowerCase() === normalizedPatientName
        );
        setPatientBookings(filteredBookings);
        setLoading(false);
      } catch (err) {
        setError('Failed to load patient bookings.');
        setLoading(false);
      }
    };

    if (patientName) {
      fetchPatientBookings();
    } else {
      setError('Patient name not provided in URL.');
      setLoading(false);
    }
  }, [patientName]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading {patientName.replace(/-/g, ' ')}'s bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
        <Link to="/my-bookings" className="back-button">Back to All Bookings</Link>
      </div>
    );
  }

  const displayPatientName = patientBookings.length > 0 ? patientBookings[0].patientName : patientName.replace(/-/g, ' ');

  return (
    <div className="patient-detail-container">
      <section className="patient-detail-hero">
        <div className="patient-detail-hero-content">
          <h1>{displayPatientName}'s Appointments</h1>
          <p>Detailed view of all booked appointments for {displayPatientName}</p>
        </div>
      </section>

      <div className="patient-detail-content">
        {patientBookings.length > 0 ? (
          <div className="bookings-table-container">
            <table>
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Service Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {patientBookings.map(booking => (
                  <tr key={booking.id}>
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
            <p>No appointments found for {displayPatientName}.</p>
            <p>Go back to <Link to="/my-bookings">All Bookings</Link> or <Link to="/contact">Book a New Appointment</Link>.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetail; 