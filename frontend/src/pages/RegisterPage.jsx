import React from 'react';
import RegisterComponent from '../components/RegisterComponent';

const RegisterPage = () => {
  return (
    <div className="register-page-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-6 col-md-8">
          <div className="register-card-wrapper">
            <RegisterComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;