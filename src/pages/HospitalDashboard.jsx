import React, { useState, useEffect } from 'react';
import '../styles/HospitalDashboard.css';

const HospitalDashboard = () => {
  const [bookings, setBookings] = useState([
    {
      patientName: 'Alice Wonderland',
      doctorName: 'Dr. Sarah Johnson',
      serviceType: 'Cardiology Checkup',
      date: '2024-07-20',
      time: '10:00 AM',
      status: 'Confirmed'
    },
    {
      patientName: 'Bob The Builder',
      doctorName: 'Dr. Ahmed Hassan',
      serviceType: 'Neurology Consultation',
      date: '2024-07-21',
      time: '02:00 PM',
      status: 'Pending'
    },
    {
      patientName: 'Charlie Chaplin',
      doctorName: 'Dr. Maria Rodriguez',
      serviceType: 'Pediatric Consultation',
      date: '2024-07-22',
      time: '11:00 AM',
      status: 'Confirmed'
    },
    {
      patientName: 'Diana Prince',
      doctorName: 'Dr. James Wilson',
      serviceType: 'Orthopedic Assessment',
      date: '2024-07-23',
      time: '09:00 AM',
      status: 'Cancelled'
    },
    {
      patientName: 'Eve Harrington',
      doctorName: 'Dr. Emily Chen',
      serviceType: 'Dermatology Follow-up',
      date: '2024-07-24',
      time: '03:00 PM',
      status: 'Confirmed'
    },
  ]);

  return (
    <div className="hospital-dashboard-container">
      <h1>Hospital Dashboard - Patient Bookings</h1>
      <p>View and manage all scheduled patient appointments.</p>

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
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.patientName}</td>
                <td>{booking.doctorName}</td>
                <td>{booking.serviceType}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>
                  <span className={`status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalDashboard; 