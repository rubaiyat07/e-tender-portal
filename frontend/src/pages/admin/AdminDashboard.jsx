// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import AdminSidebarComponent from '../../components/dashboard/AdminSidebarComponent';
import AdminDashboardHeaderComponent from '../../components/dashboard/AdminDashboardHeaderComponent';

const AdminDashboard = () => {
  return (
  
      <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <AdminSidebarComponent />

      {/* Right side: Header + Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Dashboard Header */}
        <AdminDashboardHeaderComponent />

        {/* Main Content Area */}
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel.</p>

      {/* Admin contents */}
    </div>
      </div>

  );
};

export default AdminDashboard;
