import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentType: '',
    appointmentDate: '',
    appointmentTime: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: null
  });

  const appointmentTypes = [
    'General Checkup',
    'Dental Care',
    'Eye Checkup',
    'Cardiology',
    'Orthopedics',
    'Pediatrics'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, error: null });

    try {
      const existingBookings = JSON.parse(localStorage.getItem('appointments') || '[]');
      const newBooking = {
        ...formData,
        status: 'pending',
        bookingDate: new Date().toISOString()
      };
      
      localStorage.setItem('appointments', JSON.stringify([...existingBookings, newBooking]));
      
      setFormStatus({ submitted: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        appointmentType: '',
        appointmentDate: '',
        appointmentTime: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({ submitted: false, error: 'Failed to book appointment. Please try again.' });
    }
  };

  const contactInfo = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Address',
      content: '123 Health Street, Medical District, City, Country',
      link: 'https://maps.google.com'
    },
    {
      icon: 'fa-phone',
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: 'fa-envelope',
      title: 'Email',
      content: 'info@healthbot.com',
      link: 'mailto:info@healthbot.com'
    },
    {
      icon: 'fa-clock',
      title: 'Working Hours',
      content: '24/7 Emergency Support',
      link: null
    }
  ];

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Book an Appointment</h1>
          <p>Schedule your healthcare visit with us</p>
        </div>
      </section>

      <div className="contact-content">
        <section className="contact-info-section">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-info-icon">
                  <i className={`fas ${info.icon}`}></i>
                </div>
                <h3>{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="contact-info-link">
                    {info.content}
                  </a>
                ) : (
                  <p>{info.content}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="contact-form-section">
          <div className="form-container">
            <h2>Book Your Appointment</h2>
            {formStatus.submitted ? (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <h3>Appointment Booked Successfully!</h3>
                <p>Thank you for booking with us. We'll send you a confirmation email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {formStatus.error && (
                  <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {formStatus.error}
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentType">Service Type</label>
                  <select
                    id="appointmentType"
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    {appointmentTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentDate">Preferred Date</label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentTime">Preferred Time</label>
                  <select
                    id="appointmentTime"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Additional Notes</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific concerns or requirements"
                    rows="3"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    width: '100%',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="fas fa-calendar-check"></i>
                  Book Appointment
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647043087964!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;