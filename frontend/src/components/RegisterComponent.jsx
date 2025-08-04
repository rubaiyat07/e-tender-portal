import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterComponent.css';

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Replace with actual API call
      console.log('Registration data:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On successful registration
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="register-success">
        <div className="success-icon">
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <h3>Registration Successful!</h3>
        <p>You will be redirected to login page shortly.</p>
      </div>
    );
  }

  return (
    <div className="register-card">
      <div className="register-header">
        <h2>Create Account</h2>
        <p>Join E-Tender Portal to access tender opportunities</p>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Your full name"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="company">Company/Organization</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-control"
                placeholder="Your company name"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Your email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Your phone number"
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Create password"
                required
                minLength="6"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-check mb-4">
          <input
            type="checkbox"
            id="terms"
            className="form-check-input"
            required
          />
          <label htmlFor="terms" className="form-check-label">
            I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
          </label>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100 register-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Registering...
            </>
          ) : (
            'Create Account'
          )}
        </button>

        <div className="text-center mt-4">
          <p className="mb-0">
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;