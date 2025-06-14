import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: '500+', label: 'Healthcare Providers' },
    { number: '50k+', label: 'Happy Patients' },
    { number: '15+', label: 'Years Experience' },
    { number: '24/7', label: 'Support' },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'Medical Director',
      image: 'https://placehold.co/200x200',
      bio: 'With over 20 years of experience in healthcare management.',
    },
    {
      name: 'Dr. Michael Chen',
      position: 'Chief Technology Officer',
      image: 'https://placehold.co/200x200',
      bio: 'Leading our digital transformation initiatives.',
    },
    {
      name: 'Dr. Emily Rodriguez',
      position: 'Head of Patient Care',
      image: 'https://placehold.co/200x200',
      bio: 'Dedicated to ensuring the highest quality of patient care.',
    },
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About HealthBot</h1>
          <p>Connecting patients with the best healthcare providers since 2008</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At HealthBot, we're committed to revolutionizing healthcare accessibility
            by connecting patients with qualified healthcare providers through our
            innovative platform. We believe everyone deserves access to quality
            healthcare services.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <i className="fas fa-heart"></i>
            <h3>Patient Care</h3>
            <p>Putting patients first in everything we do</p>
          </div>
          <div className="value-card">
            <i className="fas fa-handshake"></i>
            <h3>Trust</h3>
            <p>Building lasting relationships through transparency</p>
          </div>
          <div className="value-card">
            <i className="fas fa-lightbulb"></i>
            <h3>Innovation</h3>
            <p>Continuously improving healthcare delivery</p>
          </div>
          <div className="value-card">
            <i className="fas fa-users"></i>
            <h3>Community</h3>
            <p>Creating a supportive healthcare community</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Leadership Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p className="position">{member.position}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Join Our Healthcare Community</h2>
        <p>Experience the future of healthcare with HealthBot</p>
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

export default About; 