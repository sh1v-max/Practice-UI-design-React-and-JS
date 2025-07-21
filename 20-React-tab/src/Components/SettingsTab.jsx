import React, { useState } from 'react'
import {Bell, Eye, EyeOff } from 'lucide-react';

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    autoSave: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleToggle = (setting) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  return (
    <div className="settings-content">
      <div className="settings-section">
        <h3>Preferences</h3>

        <div className="setting-item">
          <div className="setting-info">
            <Bell size={16} />
            <div>
              <div className="setting-name">Push Notifications</div>
              <div className="setting-desc">
                Receive notifications about updates
              </div>
            </div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div>
              <div className="setting-name">Dark Mode</div>
              <div className="setting-desc">Switch to dark theme</div>
            </div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div>
              <div className="setting-name">Email Updates</div>
              <div className="setting-desc">Receive weekly summary emails</div>
            </div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.emailUpdates}
              onChange={() => handleToggle('emailUpdates')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div>
              <div className="setting-name">Auto Save</div>
              <div className="setting-desc">Automatically save changes</div>
            </div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={() => handleToggle('autoSave')}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Security</h3>
        <div className="form-group">
          <label>Current Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <button className="change-password-btn">Change Password</button>
      </div>
    </div>
  )
}

export default SettingsTab
