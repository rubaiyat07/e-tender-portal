import React from 'react';
import LoginComponent from '../components/LoginComponent'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await fetch(
        'http://localhost/Web_Dev/Git%20Demo/e-tender-portal/backend/api/auth/login.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (data.status) {
        // Save user info (could include token, user_type, username, etc)
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect user based on user_type
        if (data.user.user_type === 'admin') {
          navigate('/admin');
        } else if (data.user.user_type === 'vendor') {
          navigate('/dashboard/vendor');
        } else {
          navigate('/dashboard');
        }
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      alert(error.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-5 col-md-7">
          <div className="login-card-wrapper">
            <LoginComponent onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
