import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'consultation',
      title: 'Online Consultation',
      icon: 'fa-video',
      description: 'Connect with healthcare providers through secure video consultations from the comfort of your home.',
      features: [
        '24/7 Availability',
        'Secure Video Calls',
        'Digital Prescriptions',
        'Follow-up Care'
      ]
    },
    {
      id: 'checkup',
      title: 'Health Checkup',
      icon: 'fa-stethoscope',
      description: 'Comprehensive health checkups and preventive care services to maintain your well-being.',
      features: [
        'Full Body Checkup',
        'Specialized Screenings',
        'Health Reports',
        'Preventive Care'
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency Care',
      icon: 'fa-ambulance',
      description: 'Immediate medical attention and emergency care services when you need them the most.',
      features: [
        '24/7 Emergency Support',
        'Quick Response',
        'Ambulance Service',
        'Emergency Consultation'
      ]
    },
    {
      id: 'specialist',
      title: 'Specialist Care',
      icon: 'fa-user-md',
      description: 'Access to specialized medical care from experienced healthcare professionals.',
      features: [
        'Multiple Specialties',
        'Expert Consultation',
        'Treatment Plans',
        'Follow-up Care'
      ]
    }
  ];

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1>Our Healthcare Services</h1>
          <p>Comprehensive healthcare solutions for you and your family</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid">
        {services.map((service) => (
          <div key={service.id} id={service.id} className="service-card">
            <div className="service-icon">
              <i className={`fas ${service.icon}`}></i>
            </div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, index) => (
                <li key={index}>
                  <i className="fas fa-check"></i>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="learn-more-btn">
              Learn More
            </Link>
          </div>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Choose a Service</h3>
            <p>Select from our range of healthcare services</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Book Appointment</h3>
            <p>Schedule your appointment at your convenience</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Connect with Provider</h3>
            <p>Meet with your healthcare provider</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Get Care</h3>
            <p>Receive quality healthcare services</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <h2>Ready to Get Started?</h2>
        <p>Experience our healthcare services today</p>
        <div className="cta-buttons">
          <Link to="/providers" className="primary-button">
            Find a Provider
          </Link>
          <Link to="/contact" className="secondary-button">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services; 