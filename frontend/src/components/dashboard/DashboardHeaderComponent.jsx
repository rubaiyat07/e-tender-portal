// src/components/dashboard/DashboardHeaderComponent.jsx
import React from 'react';

const DashboardHeaderComponent = () => {
  return (
    <div className="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
      <h5>Welcome to your dashboard</h5>
      <div>
        <span className="me-3">Logged in as: <strong>Vendor</strong></span>
        <button className="btn btn-outline-danger btn-sm">Logout</button>
      </div>
    </div>
  );
};

export default DashboardHeaderComponent;
