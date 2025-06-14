import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProviderById } from '../services/providerService';

const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const data = await getProviderById(id);
        setProvider(data);
        setLoading(false);
      } catch (err) {
        setError('Provider not found');
        setLoading(false);
      }
    };

    loadProvider();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading provider details...</p>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error || 'Provider not found'}</p>
        <button onClick={() => navigate('/providers')} className="back-button">
          <i className="fas fa-arrow-left"></i>
          Back to Providers
        </button>
      </div>
    );
  }

  return (
    <div className="provider-detail-container">
      <button onClick={() => navigate('/providers')} className="back-button">
        <i className="fas fa-arrow-left"></i>
        Back to Providers
      </button>

      <div className="provider-profile">
        <div className="provider-header">
          <div className="provider-image">
            <img src={provider.image} alt={provider.name} />
          </div>
          <div className="provider-info">
            <h1>{provider.name}</h1>
            <p className="specialization">{provider.specialization}</p>
            <div className="provider-stats">
              <div className="stat">
                <i className="fas fa-star"></i>
                <span>{provider.rating} Rating</span>
              </div>
              <div className="stat">
                <i className="fas fa-map-marker-alt"></i>
                <span>{provider.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="provider-actions">
          <button className="primary-button">
            <i className="fas fa-calendar-alt"></i>
            Book Appointment
          </button>
          <button className="secondary-button">
            <i className="fas fa-phone"></i>
            Contact Provider
          </button>
        </div>

        <div className="provider-content">
          <section className="about-section">
            <h2>About</h2>
            <p>{provider.longDescription}</p>
          </section>

          <section className="education-section">
            <h2>Education</h2>
            <div className="education-list">
              {provider.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h3>{edu.degree}</h3>
                  <p>{edu.institution}</p>
                  <span>{edu.year}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="experience-section">
            <h2>Experience</h2>
            <div className="experience-list">
              {provider.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h3>{exp.position}</h3>
                  <p>{exp.organization}</p>
                  <span>{exp.duration}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="languages-section">
            <h2>Languages Spoken</h2>
            <div className="languages-list">
              {provider.languages.map((language, index) => (
                <span key={index} className="language-tag">
                  {language}
                </span>
              ))}
            </div>
          </section>

          <section className="contact-section">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${provider.contactEmail}`}>{provider.contactEmail}</a>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <a href={`tel:${provider.phoneNumber}`}>{provider.phoneNumber}</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail; 