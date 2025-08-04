// src/components/NavbarComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarComponent.css';

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="logo-icon px-3 py-2 rounded me-2 d-inline-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
            </svg>
          </span>
          <span className="fw-bold">E-Tender Portal</span>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-1">
              <Link 
                to="/" 
                className="nav-link position-relative px-3 py-2 rounded"
              >
                <span className="position-relative z-1 glass-hover-effect">Home</span>
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link 
                to="/tenders" 
                className="nav-link position-relative px-3 py-2 rounded"
              >
                <span className="position-relative z-1 glass-hover-effect">Tenders</span>
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link 
                to="/about" 
                className="nav-link position-relative px-3 py-2 rounded"
              >
                <span className="position-relative z-1 glass-hover-effect">About</span>
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link 
                to="/contact" 
                className="nav-link position-relative px-3 py-2 rounded"
              >
                <span className="position-relative z-1 glass-hover-effect">Contact Us</span>
              </Link>
            </li>
            {/* Add more nav links here as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;