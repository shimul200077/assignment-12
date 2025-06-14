import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', path: '/' },
        { label: 'Find Doctors', path: '/providers' },
        { label: 'Services', path: '/services' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Online Consultation', path: '/services#consultation' },
        { label: 'Health Checkup', path: '/services#checkup' },
        { label: 'Emergency Care', path: '/services#emergency' },
        { label: 'Specialist Care', path: '/services#specialist' },
      ],
    },
    {
      title: 'Contact Info',
      links: [
        { label: 'Emergency: 24/7', path: 'tel:+1234567890' },
        { label: 'Email: info@healthbot.com', path: 'mailto:info@healthbot.com' },
        { label: 'Address: 123 Health Street', path: '#' },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <i className="fas fa-heartbeat"></i>
              <span>HealthBot</span>
            </Link>
            <p className="footer-description">
              Your trusted partner in healthcare. We provide quality medical services
              and connect you with the best healthcare providers.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="footer-section">
              <h3 className="footer-section-title">{section.title}</h3>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} HealthBot. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-bottom-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 