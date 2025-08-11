// src/components/LogoutComponent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost/Web_Dev/Git%20Demo/e-tender-portal/backend/api/auth/logout.php', {
        method: 'POST',
        credentials: 'include', // if you use cookies/session
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status) {
        // Clear localStorage/sessionStorage or context here
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');

        // Redirect to login or home page
        navigate('/login');
      } else {
        alert('Logout failed: ' + data.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutComponent;
