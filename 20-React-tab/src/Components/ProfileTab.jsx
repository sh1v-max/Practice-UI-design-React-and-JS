import React, { useState } from 'react'
import {Save} from 'lucide-react';

const ProfileTab = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Full-stack developer with 5 years of experience'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-content">
      <div className="profile-header">
        <div className="avatar">JD</div>
        <button 
          className="edit-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      <div className="form-group">
        <label>Full Name</label>
        <input 
          type="text" 
          value={formData.name}
          disabled={!isEditing}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          value={formData.email}
          disabled={!isEditing}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>Phone</label>
        <input 
          type="tel" 
          value={formData.phone}
          disabled={!isEditing}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>Bio</label>
        <textarea 
          value={formData.bio}
          disabled={!isEditing}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
        />
      </div>
      
      {isEditing && (
        <button className="save-btn" onClick={handleSave}>
          <Save size={16} />
          Save Changes
        </button>
      )}
    </div>
  );
}

export default ProfileTab