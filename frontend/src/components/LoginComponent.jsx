import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginComponent.css';

const LoginComponent = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (typeof onLogin === 'function') {
      try {
        await onLogin(formData);
      } catch (err) {
        setError(err.message || 'Login failed. Please try again.');
      }
    } else {
      setError('Login function is not defined.');
    }

    setIsLoading(false);
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your E-Tender account</p>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="form-check">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="form-check-input"
            />
            <label htmlFor="rememberMe" className="form-check-label">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100 login-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="text-center mt-4">
          <p className="mb-0">
            Don't have an account?{' '}
            <Link to="/register" className="register-link">
              Create one
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
