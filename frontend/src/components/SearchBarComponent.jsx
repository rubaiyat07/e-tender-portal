// src/components/SearchBarComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchBarComponent.css';

const SearchBarComponent = ({ isLoggedIn = false }) => {
  return (
    <div className="search-bar-container">
      {/* Search Bar on the left */}
      <div className="search-input-container">
        <input 
          type="text" 
          placeholder="Search tenders..." 
          className="search-input"
        />
        <button className="search-button">
          <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Right side icons */}
      <div className="icons-container">
        {/* Notification Icon */}
        <button className="icon-button notification-button">
          <i className="bi bi-bell-fill"></i>
          <span className="notification-badge">3</span>
        </button>

        {/* Profile Icon */}
        {isLoggedIn ? (
          <Link to="/profile" className="icon-button profile-button">
            <i className="bi bi-person-fill"></i>
          </Link>
        ) : (
          <button className="icon-button profile-button" disabled>
            <i className="bi bi-person-fill"></i>
          </button>
        )}

        {/* Conditional rendering based on login state */}
        {isLoggedIn ? (
          // Logout Button (visible when logged in)
          <Link to="/logout" className="icon-button logout-button">
            <i className="bi bi-box-arrow-right"></i>
            <span className="button-text">Logout</span>
          </Link>
        ) : (
          // Login and Register Buttons (visible when logged out)
          <>
            <Link to="/login" className="icon-button login-button">
              <i className="bi bi-box-arrow-in-right"></i>
              <span className="button-text">Login</span>
            </Link>
            <Link to="/register" className="icon-button register-button">
              <i className="bi bi-person-plus-fill"></i>
              <span className="button-text">Register</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBarComponent;