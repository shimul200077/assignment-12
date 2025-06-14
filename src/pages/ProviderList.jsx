import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProviders } from '../services/providerService';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const data = await getProviders();
        setProviders(data);
        setFilteredProviders(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load providers. Please try again later.');
        setLoading(false);
      }
    };

    loadProviders();
  }, []);

  useEffect(() => {
    const filtered = providers.filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = !selectedSpecialty || provider.specialization === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
    setFilteredProviders(filtered);
  }, [searchTerm, selectedSpecialty, providers]);

  const specialties = [...new Set(providers.map(p => p.specialization))];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading providers...</p>
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
    <div className="provider-list-container">
      <div className="search-filter-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">All Specializations</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="providers-grid">
        {filteredProviders.map(provider => (
          <Link to={`/providers/${provider.id}`} key={provider.id} className="provider-card">
            <div className="provider-image">
              <img src={provider.image} alt={provider.name} />
            </div>
            <div className="provider-info">
              <h3>{provider.name}</h3>
              <p className="specialization">{provider.specialization}</p>
              <p className="location">
                <i className="fas fa-map-marker-alt"></i>
                {provider.location}
              </p>
              <div className="rating">
                <i className="fas fa-star"></i>
                <span>{provider.rating}</span>
              </div>
              <p className="description">{provider.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <p>No providers found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProviderList; 