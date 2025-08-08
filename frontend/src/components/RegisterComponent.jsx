import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterComponent.css';

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    nationality: '',
    country_of_business: '',
    password: '',
    confirmPassword: '',
    user_type: 'vendor'
  });

  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpResent, setOtpResent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load countries list
    const loadCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryNames = response.data.map(country => country.name.common).sort();
        setCountries(countryNames);
      } catch (err) {
        console.error('Failed to load countries', err);
        setCountries(['United States', 'Canada', 'United Kingdom', 'Australia', 'Bangladesh', 'India', 'Pakistan']); // Fallback
      }
    };

    loadCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost/Web_Dev/Git%20Demo/e-tender-portal/backend/api/auth/register.php',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data && response.data.status) {
        setShowOtpModal(true);
      } else {
        setError(response.data?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost/Web_Dev/Git%20Demo/e-tender-portal/backend/api/auth/verify_otp.php',
        {
          email: formData.email,
          otp: otp.trim()
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data && response.data.status) {
        setShowOtpModal(false);
        navigate('/login');
      } else {
        setOtpError(response.data?.message || 'OTP verification failed. Please check the code and try again.');
      }
    } catch (err) {
      setOtpError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        'http://localhost/Web_Dev/Git%20Demo/e-tender-portal/backend/api/auth/resend_otp.php',
        {
          email: formData.email
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data && response.data.status) {
        setOtpResent(true);
        setTimeout(() => setOtpResent(false), 3000);
      } else {
        setOtpError(response.data?.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  const handleVerifyEmailClick = () => {
    setShowOtpModal(true);
  };

  const OtpModal = ({ show, onClose, email, onVerify, onResend, otp, setOtp, error, otpResent, setOtpError, setOtpResent, setShowOtpModal, navigate }) => {
    const otpInputRef = useRef(null);
    const [isAutoTriggered, setIsAutoTriggered] = useState(false);
    const [manualEmail, setManualEmail] = useState('');

    useEffect(() => {
      if (show && otpInputRef.current) {
        setIsAutoTriggered(!!email);
        if (email) {
          setManualEmail(email);
        }
        otpInputRef.current.focus();
      }
    }, [show, email]);

    const handleOtpChange = (e) => {
      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
      setOtp(value);
      setOtpError('');
    };

    const handleEmailChange = (e) => {
      setManualEmail(e.target.value);
    };

    const handleManualVerify = async () => {
      if (!manualEmail) {
        setOtpError('Please enter your email');
        return;
      }
      if (otp.length !== 6) {
        setOtpError('Please enter a valid 6-digit OTP');
        return;
      }
      try {
        const response = await axios.post(
          'http://localhost/Web_Dev/Git%20Demo/e-tender-portal/backend/api/auth/verify_otp.php',
          {
            email: manualEmail,
            otp: otp.trim()
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );
        if (response.data && response.data.status) {
          setShowOtpModal(false);
          navigate('/login');
        } else {
          setOtpError(response.data?.message || 'OTP verification failed. Please check the code and try again.');
        }
      } catch (err) {
        setOtpError(err.response?.data?.message || 'OTP verification failed. Please try again.');
      }
    };

    const handleManualResend = async () => {
      if (!manualEmail) {
        setOtpError('Please enter your email');
        return;
      }
      try {
        const response = await axios.post(
          'http://localhost/Web_Dev/Git%20Demo/e-tender-portal/backend/api/auth/resend_otp.php',
          {
            email: manualEmail
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );
        if (response.data && response.data.status) {
          setOtpResent(true);
          setTimeout(() => setOtpResent(false), 3000);
        } else {
          setOtpError(response.data?.message || 'Failed to resend OTP');
        }
      } catch (err) {
        setOtpError(err.response?.data?.message || 'Failed to resend OTP');
      }
    };

    if (!show) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>OTP Verification</h3>
            <button onClick={onClose} className="modal-close">&times;</button>
          </div>
          <div className="modal-body">
            {isAutoTriggered ? (
              <div className="form-group mb-3">
                <label htmlFor="modal-email">Email Address</label>
                <input
                  type="email"
                  id="modal-email"
                  className="form-control"
                  value={email}
                  readOnly
                />
                <p className="mt-2">We've sent a 6-digit OTP to <strong>{email}</strong></p>
              </div>
            ) : (
              <div className="form-group mb-3">
                <label htmlFor="manual-email">Email Address *</label>
                <input
                  type="email"
                  id="manual-email"
                  className="form-control"
                  value={manualEmail}
                  onChange={handleEmailChange}
                  placeholder="Enter your registered email"
                  required
                />
              </div>
            )}

            {otpResent && (
              <div className="alert alert-success">
                New OTP has been sent successfully!
              </div>
            )}

            <div className="form-group">
              <label htmlFor="otp">Enter OTP *</label>
              <input
                ref={otpInputRef}
                type="text"
                id="otp"
                className="form-control otp-input"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
              />
              {error && <div className="text-danger mt-2">{error}</div>}
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={isAutoTriggered ? onResend : handleManualResend}
            >
              Resend OTP
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={isAutoTriggered ? onVerify : handleManualVerify}
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Vendor Registration</h2>
          <p>Register as a vendor to access tender opportunities</p>
        </div>
        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="full_name">Full Name *</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="company_name">Company Name *</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Your company name"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
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
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
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
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nationality">Nationality *</label>
                <select
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Nationality</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="country_of_business">Country of Business *</label>
            <select
              id="country_of_business"
              name="country_of_business"
              value={formData.country_of_business}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Create password (min 6 characters)"
                  required
                  minLength="6"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
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
          <input type="hidden" name="user_type" value="vendor" />
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
              'Register as Vendor'
            )}
          </button>
          <div className="text-center mt-4">
            <p className="mb-0">
              Already have an account?{' '}
              <Link to="/login" className="login-link">
                Sign in
              </Link>
            </p>
            <p className="mb-0 mt-2">
              Need to verify your email?{' '}
              <Link to="#" onClick={handleVerifyEmailClick} className="verify-link">
                Click here
              </Link>
            </p>
          </div>
        </form>
      </div>

      <OtpModal
        show={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={formData.email}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        otp={otp}
        setOtp={setOtp}
        error={otpError}
        otpResent={otpResent}
        setOtpError={setOtpError}
        setOtpResent={setOtpResent}
        setShowOtpModal={setShowOtpModal}
        navigate={navigate}
      />
    </div>
  );
};

export default RegisterComponent;