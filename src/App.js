import React, { useState } from 'react';
import './App.css';

const profilesData = [
  { id: 1, name: 'John Doe', description: 'Software Developer', image: 'https://via.placeholder.com/150', location: 'New York' },
  { id: 2, name: 'Jane Smith', description: 'Graphic Designer', image: 'https://via.placeholder.com/150', location: 'Los Angeles' },
];

export default function ProfileExplorer() {
  const [profiles, setProfiles] = useState(profilesData);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [newProfile, setNewProfile] = useState({ name: '', description: '', image: '', location: '' });
  const [filterText, setFilterText] = useState('');

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleDelete = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  const handleAddProfile = () => {
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1 }]);
    setNewProfile({ name: '', description: '', image: '', location: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const loadMap = (location) => {
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
    return <iframe title="map" src={mapUrl} className="map-frame"></iframe>;
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container">
      <button onClick={() => setAdminMode(!adminMode)} className="admin-toggle">
        {adminMode ? 'Exit Admin Mode' : 'Enter Admin Mode'}
      </button>

      {adminMode && (
        <div className="admin-panel">
          <h2>Admin Panel</h2>
          <input type="text" name="name" placeholder="Name" value={newProfile.name} onChange={handleInputChange} />
          <input type="text" name="description" placeholder="Description" value={newProfile.description} onChange={handleInputChange} />
          <input type="text" name="image" placeholder="Image URL" value={newProfile.image} onChange={handleInputChange} />
          <input type="text" name="location" placeholder="Location" value={newProfile.location} onChange={handleInputChange} />
          <button onClick={handleAddProfile}>Add Profile</button>
        </div>
      )}

      <input
        type="text"
        placeholder="Search profiles..."
        value={filterText}
        onChange={handleFilterChange}
        className="search-input"
      />

      <div className="grid">
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="card">
            <img src={profile.image} alt={profile.name} />
            <div className="card-content">
              <h2>{profile.name}</h2>
              <p>{profile.description}</p>
              <button onClick={() => handleSummaryClick(profile)}>Summary</button>
              {adminMode && <button onClick={() => handleDelete(profile.id)}>Delete</button>}
            </div>
          </div>
        ))}
      </div>

      {selectedProfile && (
        <div className="profile-details">
          <h2>{selectedProfile.name}'s Location</h2>
          <p>{selectedProfile.location}</p>
          {loadMap(selectedProfile.location)}
        </div>
      )}
    </div>
  );
}
