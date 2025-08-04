// src/pages/About.jsx
import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <div className="container">
          <h1>About e-GP System</h1>
          <p className="breadcrumb">Home / About</p>
        </div>
      </div>

      <div className="container about-content">
        <div className="row">
          <div className="col-lg-8">
            <div className="about-card">
              <h2>About Bangladesh e-Government Procurement (e-GP)</h2>
              <p>
                The e-Government Procurement (e-GP) system of Bangladesh is a digital platform 
                designed to make public procurement more efficient, transparent, and accountable. 
                Implemented by the Central Procurement Technical Unit (CPTU) under the 
                Implementation Monitoring and Evaluation Division (IMED) of the Ministry of Planning, 
                the system automates the entire procurement process.
              </p>
              
              <h3>Our Vision</h3>
              <p>
                To establish a modern, transparent, and efficient public procurement system 
                that ensures value for money and supports national development goals.
              </p>
              
              <h3>Our Mission</h3>
              <p>
                To implement and maintain an electronic procurement system that enhances 
                transparency, reduces processing time, minimizes costs, and improves 
                the quality of public procurement in Bangladesh.
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Online tender publication and submission</li>
                <li>Electronic bid evaluation</li>
                <li>Contract management system</li>
                <li>Vendor registration and management</li>
                <li>Real-time monitoring and reporting</li>
                <li>Secure digital document management</li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="sidebar-card">
              <h3>Quick Links</h3>
              <ul className="quick-links">
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/faq">FAQs</a></li>
                <li><a href="/resources">Resources</a></li>
                <li><a href="/tutorials">Tutorials</a></li>
                <li><a href="/statistics">Statistics</a></li>
              </ul>
            </div>
            
            <div className="sidebar-card">
              <h3>Downloads</h3>
              <ul className="download-links">
                <li><a href="/downloads/user-manual">User Manual</a></li>
                <li><a href="/downloads/forms">Standard Forms</a></li>
                <li><a href="/downloads/guidelines">Procurement Guidelines</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="milestones-section">
        <div className="container">
          <h2>Our Milestones</h2>
          <div className="row">
            <div className="col-md-4 milestone-item">
              <div className="milestone-card">
                <h3>2011</h3>
                <p>Pilot implementation of e-GP system</p>
              </div>
            </div>
            <div className="col-md-4 milestone-item">
              <div className="milestone-card">
                <h3>2014</h3>
                <p>National rollout begins</p>
              </div>
            </div>
            <div className="col-md-4 milestone-item">
              <div className="milestone-card">
                <h3>2020</h3>
                <p>1 million+ tenders processed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;