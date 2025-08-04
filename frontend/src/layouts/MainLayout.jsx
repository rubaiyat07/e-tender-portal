import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderComponent />
      <main className="main-content">
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;