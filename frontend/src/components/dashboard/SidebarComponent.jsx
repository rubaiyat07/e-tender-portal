// src/components/dashboard/SidebarComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarComponent = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
      <h4 className="mb-4">Dashboard</h4>
      <ul className="list-unstyled">
        <li>
          <Link to="/dashboard" className="text-white text-decoration-none">
            <i className="bi bi-speedometer2"></i> Overview
          </Link>
        </li>
        <li>
          <Link to="/dashboard/tenders" className="text-white text-decoration-none">
            <i className="bi bi-file-earmark-text"></i> My Tenders
          </Link>
        </li>
        <li>
          <Link to="/dashboard/profile" className="text-white text-decoration-none">
            <i className="bi bi-person-circle"></i> Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarComponent;
