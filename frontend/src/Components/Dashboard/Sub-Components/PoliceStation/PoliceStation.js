import React, { useState } from 'react';
import { Shield, MapPin, Loader, Landmark } from 'lucide-react';
import './PoliceStation.css';

const PoliceStations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Stations', icon: <MapPin className="w-5 h-5" /> },
    { id: 'traffic', name: 'Traffic', icon: <MapPin className="w-5 h-5" /> },
    { id: 'women', name: 'Women', icon: <Shield className="w-5 h-5" /> },
    { id: 'cyber', name: 'Cyber Crime', icon: <Landmark className="w-5 h-5" /> },
  ];

  const stations = [
    {
      id: 1,
      category: 'traffic',
      name: 'City Traffic Police Station',
      emergency: true,
      mapLink: 'https://www.google.com/maps/search/?api=1&query=City+Traffic+Police+Station',
    },
    {
      id: 2,
      category: 'women',
      name: 'Women Safety Cell',
      emergency: true,
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Women+Police+Station',
    },
    {
      id: 3,
      category: 'cyber',
      name: 'Cyber Crime Police Station',
      emergency: true,
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station',
    },
  ];

  const filteredStations = stations.filter(
    station => selectedCategory === 'all' || station.category === selectedCategory
  );

  return (
    <div className="police-station-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="header-section">
          <h1 className="header-title">Nearest Police Stations</h1>
          <p className="header-subtitle">Locate your nearest traffic, cyber, and women's police stations</p>
        </div>

        {/* Category Filters */}
        <div className="categories-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Station Cards */}
        <div className="services-grid">
          {isLoading ? (
            <Loader className="loader" />
          ) : (
            filteredStations.map(station => (
              <div key={station.id} className="service-card">
                <h2 className="service-title">{station.name}</h2>
                {station.emergency && <span className="tag tag-red">24/7 Emergency</span>}
                <div className="buttons-container">
                  <a
                    href={station.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-button"
                  >
                    <MapPin className="map-icon" /> View on Map
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* No Results */}
        {filteredStations.length === 0 && !isLoading && (
          <div className="no-results">No police stations found.</div>
        )}
      </div>
    </div>
  );
};

export default PoliceStations;
