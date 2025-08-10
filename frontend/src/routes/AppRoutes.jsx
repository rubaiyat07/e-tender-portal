// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TendersPage from '../pages/TendersPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardMainContentComponent from '../components/dashboard/DashboardMainContentComponent';

// Example dashboard pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import VendorDashboard from '../pages/vendor/VendorDashboard';
import UnauthorizedPage from '../pages/UnauthorizedPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tenders" element={<TendersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Vendor Dashboard */}
        <Route
          path="/dashboard"
          element={<DashboardLayout allowedRoles={['vendor']} />}
        >
          <Route index element={<VendorDashboard />} />
          <Route path="tenders" element={<div>My Tenders Page</div>} />
          <Route path="profile" element={<div>Profile Page</div>} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={<DashboardLayout allowedRoles={['admin']} />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="manage-users" element={<div>Manage Users Page</div>} />
          <Route path="manage-tenders" element={<div>Manage Tenders Page</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
