import React from 'react';
import { Link } from 'react-router-dom';
import { getProviders } from '../services/providerService';

const Home = () => {
  const [featuredProviders, setFeaturedProviders] = React.useState([]);

  React.useEffect(() => {
    const loadProviders = async () => {
      try {
        const providers = await getProviders();
        setFeaturedProviders(providers.slice(0, 3));
      } catch (error) {
        console.error('Error loading providers:', error);
      }
    };
    loadProviders();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Healthcare Platform</h1>
          <p>Connecting you with the best healthcare providers in your area</p>
          <Link to="/providers" className="cta-button">
            Find a Provider
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-user-md"></i>
            <h3>Expert Providers</h3>
            <p>Access to qualified and experienced healthcare professionals</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-clock"></i>
            <h3>24/7 Availability</h3>
            <p>Find and book appointments at your convenience</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-heart"></i>
            <h3>Quality Care</h3>
            <p>Committed to providing the best healthcare services</p>
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="featured-providers">
        <h2>Featured Providers</h2>
        <div className="providers-grid">
          {featuredProviders.map((provider) => (
            <div key={provider.id} className="provider-card">
              <img src={provider.image} alt={provider.name} />
              <h3>{provider.name}</h3>
              <p>{provider.specialty}</p>
              <Link to={`/providers/${provider.id}`} className="view-profile">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied patients who found their perfect healthcare provider</p>
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

export default Home; 