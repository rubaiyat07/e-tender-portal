// src/layouts/DashboardLayout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from '../components/dashboard/SidebarComponent';
import DashboardHeaderComponent from '../components/dashboard/DashboardHeaderComponent';
import { Outlet } from 'react-router-dom';

const DashboardLayout = ({ allowedRoles }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // লোকালস্টোরেজ থেকে ইউজার ডাটা নাও
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login'); // লগইন না থাকলে রিডিরেক্ট
      return;
    }

    const user = JSON.parse(userData);

    // রোল চেক করো
    if (allowedRoles && !allowedRoles.includes(user.user_type)) {
      navigate('/unauthorized'); // অনুমোদন না থাকলে রিডিরেক্ট
    }
  }, [navigate, allowedRoles]);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <SidebarComponent />

      {/* Right side: Header + Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Dashboard Header */}
        <DashboardHeaderComponent />

        {/* Main Content Area */}
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
