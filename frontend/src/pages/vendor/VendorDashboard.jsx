// src/pages/vendor/VendorDashboard.jsx
import React from 'react';
import VendorSidebarComponent from '../../components/dashboard/VendorSidebarComponent';

const VendorDashboard = () => {
  return (
      <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <VendorSidebarComponent />
      <h1>Vendor Dashboard</h1>
      <p>Welcome to the vendor panel.</p>

    </div>
  );
};

export default VendorDashboard;
