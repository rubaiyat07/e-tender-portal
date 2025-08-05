// src/components/NavbarComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarComponent.css';

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="logo-icon rounded me-2 d-inline-flex align-items-center justify-content-center">
            <img src="/assets/img/logo.png" alt="Logo" className="img-fluid" />
          </span>
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