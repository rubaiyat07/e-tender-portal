// src/pages/ContactPage.jsx
import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* Page Header */}
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="breadcrumb">Home / Contact</p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-5">
            <div className="contact-info-card">
              <h2>Get in Touch</h2>
              <p>Have questions or need assistance? Reach out to our team through any of the following channels.</p>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h3>Head Office</h3>
                  <p>
                    Central Procurement Technical Unit (CPTU)<br />
                    IMED, Ministry of Planning<br />
                    Sher-e-Bangla Nagar, Dhaka-1207<br />
                    Bangladesh
                  </p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>
                    Help Desk: +880 9611 777 888<br />
                    Office: +880 2 5500 0115
                  </p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>
                    General Inquiries: <a href="mailto:info@eprocure.gov.bd">info@eprocure.gov.bd</a><br />
                    Technical Support: <a href="mailto:support@eprocure.gov.bd">support@eprocure.gov.bd</a>
                  </p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <FaClock />
                </div>
                <div className="contact-details">
                  <h3>Office Hours</h3>
                  <p>
                    Sunday-Thursday: 9:00 AM - 5:00 PM<br />
                    Friday & Saturday: Closed
                  </p>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="https://facebook.com/eprocure.bd" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                  <a href="https://twitter.com/eprocure_bd" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href="https://linkedin.com/company/eprocure-bd" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="contact-form-card">
              <h2>Send Us a Message</h2>
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input type="text" id="name" className="form-control" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input type="email" id="email" className="form-control" required />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input type="text" id="subject" className="form-control" required />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea id="message" rows="5" className="form-control" required></textarea>
                </div>

                <div className="form-group">
                  <button type="submit" className="submit-btn">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2>Our Location</h2>
          <div className="map-container">
            <iframe 
              title="CPTU Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.245715828432!2d90.3692673154309!3d23.73392328459419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8d9d9999999%3A0x1a1a1a1a1a1a1a!2sCentral%20Procurement%20Technical%20Unit%20(CPTU)!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
              allowFullScreen=""
              loading="lazy">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;