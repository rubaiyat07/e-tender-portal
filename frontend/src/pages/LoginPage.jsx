// src/pages/LoginPage.jsx
import React from 'react';
import LoginComponent from '../components/LoginComponent'; // Fixed import path

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-5 col-md-7">
          <div className="login-card-wrapper">
            <LoginComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;