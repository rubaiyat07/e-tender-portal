import React from 'react';
import './FooterComponent.css';

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          {/* Company Info */}
          <div className="footer-col">
            <h4>TenderPortal</h4>
            <p style={{ color: '#b2b2b2', lineHeight: '1.6' }}>
              Your one-stop solution for finding and bidding on government and private tenders.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/about">
                  <i className="bi bi-chevron-right"></i> About Us
                </a>
              </li>
              <li>
                <a href="/contact">
                  <i className="bi bi-chevron-right"></i> Contact
                </a>
              </li>
              <li>
                <a href="/terms">
                  <i className="bi bi-chevron-right"></i> Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy">
                  <i className="bi bi-chevron-right"></i> Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-links">
              <li>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-geo-alt-fill"></i> 123 Tender Street, Dhaka, Bangladesh
                </a>
              </li>
              <li>
                <a href="mailto:info@tenderportal.com">
                  <i className="bi bi-envelope-fill"></i> info@tenderportal.com
                </a>
              </li>
              <li>
                <a href="tel:+8801234567890">
                  <i className="bi bi-telephone-fill"></i> +880 1234 567890
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4>Newsletter</h4>
            <div className="newsletter">
              <p style={{ color: '#b2b2b2', marginBottom: '1rem' }}>
                Subscribe to get updates on new tenders
              </p>
              <input type="email" placeholder="Your email address" />
              <button type="button">
                <i className="bi bi-send-fill"></i> Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} TenderPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;