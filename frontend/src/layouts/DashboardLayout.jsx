// src/layouts/DashboardLayout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const DashboardLayout = ({ allowedRoles }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Data from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login'); // If not logged in, redirect to login
      return;
    }

    const user = JSON.parse(userData);

    // Check if user role is allowed
    if (allowedRoles && !allowedRoles.includes(user.user_type)) {
      navigate('/unauthorized'); // If role is not allowed, redirect to unauthorized page
      return;
    }
  }, [navigate, allowedRoles]);

  return (
        <div>
          <Outlet />
        </div>
  );
};

export default DashboardLayout;
