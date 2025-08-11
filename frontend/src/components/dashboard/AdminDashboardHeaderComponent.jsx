import React from 'react';
import LogoutComponent from '../LogoutComponent';

const AdminDashboardHeaderComponent = () => {
  // Get the user JSON string from localStorage
  const userJSON = localStorage.getItem('user');
  // Parse the user JSON or fallback to null
  const user = userJSON ? JSON.parse(userJSON) : null;
  // Get user_type or fallback to 'Guest'
  const user_type = user?.user_type || 'Guest';

  return (
    <div className="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
      <h5>Welcome to your dashboard</h5>
      <div>
        <span className="me-3">Logged in as: <strong>{user_type}</strong></span>
        <LogoutComponent />
      </div>
    </div>
  );
};

export default AdminDashboardHeaderComponent;
