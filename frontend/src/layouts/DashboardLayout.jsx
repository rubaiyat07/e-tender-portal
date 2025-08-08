// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import SidebarComponent from '../components/SidebarComponent';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost/e-tender-portal/backend/api/auth/check_session.php',
          { withCredentials: true }
        );
        
        if (response.data.status && response.data.user) {
          setUser(response.data.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Session check failed:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost/e-tender-portal/backend/api/auth/logout.php',
        {},
        { withCredentials: true }
      );
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout d-flex flex-column min-vh-100">
      <HeaderComponent 
        user={user} 
        onLogout={handleLogout} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="dashboard-content d-flex flex-grow-1">
        <SidebarComponent 
          user={user} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="main-content flex-grow-1">
          <div className="container-fluid py-4">
            <Outlet context={{ user }} />
          </div>
        </main>
      </div>
      
      <FooterComponent />
    </div>
  );
};

export default DashboardLayout;