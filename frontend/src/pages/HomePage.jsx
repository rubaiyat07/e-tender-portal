import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  // Static counts - To be replaced with API data later
  const stats = [
    { title: "Published Tenders", count: 1245 },
    { title: "Live Tenders", count: 342 },
    { title: "Corrigendum", count: 56 },
    { title: "Private Tenders", count: 89 }
  ];

  // Static tender policies - To be replaced with API data later
  const policies = [
    { title: "Tender Policy", content: "Our comprehensive tender policy ensures fair and transparent bidding processes for all participants." },
    { title: "About the System", content: "The E-Tender Portal provides a digital platform for efficient tender management and participation." }
  ];

  // Static help desk info - To be replaced with API data later
  const helpDesk = {
    contact: "helpdesk@etender.com",
    phone: "+880 1234 567890",
    hours: "9:00 AM - 5:00 PM (Sunday-Thursday)"
  };

  // Static news & events - To be replaced with API data later
  const newsEvents = [
    { title: "New Tender Announcement", date: "2023-06-15", summary: "Government infrastructure project tender announced" },
    { title: "System Maintenance", date: "2023-06-10", summary: "Scheduled maintenance on June 12, 2:00 AM to 5:00 AM" }
  ];

  // Static important notices - To be replaced with API data later
  const importantNotices = [
    { title: "Deadline Extension", content: "Tender #ETP-2023-045 deadline extended to June 30" },
    { title: "Document Update", content: "Revised specifications available for Tender #ETP-2023-102" }
  ];

  // Static search filters - To be replaced with dynamic options later
  const searchFilters = {
    categories: ["Construction", "IT Services", "Healthcare", "Education"],
    products: ["Software", "Hardware", "Consulting", "Equipment"],
    inviters: ["Govt. Dept A", "Govt. Dept B", "Private Corp X"],
    locations: ["Dhaka", "Chittagong", "Khulna", "Sylhet"]
  };

  // Static recent tenders - To be replaced with API data later
  const recentTenders = [
    { id: "ETP-2023-156", title: "Construction of Office Building", inviter: "Govt. Dept A", deadline: "2023-07-15", status: "Live" },
    { id: "ETP-2023-155", title: "IT Infrastructure Upgrade", inviter: "Private Corp X", deadline: "2023-07-10", status: "Live" },
    { id: "ETP-2023-154", title: "Medical Equipment Supply", inviter: "Govt. Dept B", deadline: "2023-07-05", status: "Live" }
  ];

  const [lastUpdated, setLastUpdated] = React.useState(new Date());

  // Format the date for display
  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
  <div className="container-fluid py-4">
    {/* Stats Section */}
    <section className="row stats-section mb-5">
      <div className="col-12 text-center text-light banner-text mb-4">
        <h1 className="display-4">Welcome to the E-Tender Portal</h1>
        <p className="lead">Your one-stop solution for all tender-related activities</p>
      </div>
      
      {/* Last Updated Timestamp - Added above the cards */}
      <div className="col-12 mb-3">
        <div className="text-light text-center">
          <h5 className="last-updated-text">
            Last updated: {formatDate(lastUpdated)}
          </h5>
        </div>
      </div>
      
      {stats.map((stat, index) => (
        <div key={index} className="col-md-3 col-sm-6 mb-4">
          <div className="card stats-card h-100 shadow-sm">
            <div className="card-body text-light text-center">
              <h3 className="card-title">{stat.title}</h3>
              <div className="display-4 text-primary">
                {stat.count}
              </div>
            </div>
          </div>
        </div>
      ))}
    
      {/* Action Buttons */}
      <section className="row mb-5 action-buttons">
      <div className="col-12 d-flex justify-content-center gap-4">
        <Link to="/tenders" className="btn btn-primary btn-lg action-btn browse-btn">
          Browse Tenders
        </Link>
        <Link to="/register" className="btn btn-outline-light btn-lg action-btn get-started-btn">
          Get Started
        </Link>
      </div>
      </section>
    </section>
      {/* Policy & About Section */}
<section className="row mb-5">
  {policies.map((policy, index) => (
    <div key={index} className="col-md-6 mb-4">
      <div className="card h-100 policy-card">
        <div className="card-body">
          <h2 className="card-title">{policy.title}</h2>
          <p className="card-text">{policy.content}</p>
          <a href="#learn-more" className="btn btn-outline-primary">
            Learn More
          </a>
        </div>
      </div>
    </div>
  ))}
</section>

      {/* Help Desk & Information Section */}
      <section className="row mb-5">
        {/* Help Desk Column (Thin) */}
        <div className="col-lg-3 col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h3>Help Desk</h3>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <strong>Email:</strong> {helpDesk.contact}
                </li>
                <li className="mb-3">
                  <strong>Phone:</strong> {helpDesk.phone}
                </li>
                <li className="mb-3">
                  <strong>Working Hours:</strong> {helpDesk.hours}
                </li>
              </ul>
              <button className="btn btn-primary w-100">Contact Support</button>
            </div>
          </div>
        </div>

        {/* News & Events Column */}
        <div className="col-lg-5 col-md-8 mb-4">
          <div className="card h-100">
            <div className="card-header bg-dark text-white">
              <h3>News & Events</h3>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {newsEvents.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <h5>{item.title}</h5>
                    <small className="text-muted">{item.date}</small>
                    <p>{item.summary}</p>
                  </li>
                ))}
              </ul>
              <a href="#all-news" className="btn btn-outline-info mt-3">
                View All News
              </a>
            </div>
          </div>
        </div>

        {/* Important Notices Column */}
        <div className="col-lg-4 col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-header bg-dark text-light">
              <h3>Important Notices</h3>
            </div>
            <div className="card-body">
              <div className="list-group">
                {importantNotices.map((notice, index) => (
                  <a
                    key={index}
                    href="#notice"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{notice.title}</h5>
                    </div>
                    <p className="mb-1">{notice.content}</p>
                  </a>
                ))}
              </div>
              <a href="#all-notices" className="btn btn-outline-warning mt-3">
                View All Notices
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tender Search & Listing Section */}
<section className="row">
  {/* Left Column - Filters and Resources */}
  <div className="col-lg-3 col-md-4 mb-4">

    {/* External Resources Card */}
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h3>e-Procurement Resources</h3>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          <a href="https://www.eprocure.gov.bd/resources" 
             className="list-group-item list-group-item-action" 
             target="_blank" rel="noopener noreferrer">
            <i className="bi bi-file-earmark-text me-2"></i>
            User Manuals & Guidelines
          </a>
          <a href="https://www.eprocure.gov.bd/video-tutorial" 
             className="list-group-item list-group-item-action" 
             target="_blank" rel="noopener noreferrer">
            <i className="bi bi-play-circle me-2"></i>
            Video Tutorials
          </a>
          <a href="https://www.eprocure.gov.bd/faq" 
             className="list-group-item list-group-item-action" 
             target="_blank" rel="noopener noreferrer">
            <i className="bi bi-question-circle me-2"></i>
            Frequently Asked Questions
          </a>
          <a href="https://www.eprocure.gov.bd/acts-rules" 
             className="list-group-item list-group-item-action" 
             target="_blank" rel="noopener noreferrer">
            <i className="bi bi-journal-bookmark me-2"></i>
            Acts & Rules
          </a>
          <a href="https://www.eprocure.gov.bd/contact" 
             className="list-group-item list-group-item-action" 
             target="_blank" rel="noopener noreferrer">
            <i className="bi bi-headset me-2"></i>
            Help Desk & Support
          </a>
        </div>
      </div>
    </div>

    {/* Quick Links Card */}
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h3>Quick Links</h3>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          <a href="https://www.eprocure.gov.bd/contract-award" 
             className="list-group-item list-group-item-action" 
             target="_blank" rel="noopener noreferrer">
            <i className="bi bi-award me-2"></i>
            Contract Awards
          </a>
          <a href="https://www.eprocure.gov.bd/tender-calendar" 
             className="list-group-item list-group-item-action" 
             target="_blank" rel="noopener noreferrer">
            <i className="bi bi-calendar-event me-2"></i>
            Tender Calendar
          </a>
          <a href="https://www.eprocure.gov.bd/notice" 
             className="list-group-item list-group-item-action" 
             target="_blank" rel="noopener noreferrer">
            <i className="bi bi-megaphone me-2"></i>
            Important Notices
          </a>
          <a href="https://www.eprocure.gov.bd/registered-suppliers" 
             className="list-group-item list-group-item-action" 
             target="_blank" rel="noopener noreferrer">
            <i className="bi bi-people me-2"></i>
            Registered Suppliers
          </a>
        </div>
      </div>
    </div>
  </div>

  {/* Right Column - Tenders Listing */}
  <div className="col-lg-9 col-md-8">
    <div className="card">
      <div className="card-header bg-dark text-light">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Recently Updated Tenders</h3>
          <a href="#all-tenders" className="btn btn-light btn-sm">
            <Link to="/tenders">
                <span>View All</span>
            </Link>
          </a>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Tender ID</th>
                <th>Title</th>
                <th>Inviters</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentTenders.map((tender, index) => (
                <tr key={index}>
                  <td>{tender.id}</td>
                  <td>{tender.title}</td>
                  <td>{tender.inviter}</td>
                  <td>{tender.deadline}</td>
                  <td>
                    <span className={`badge ${tender.status === 'Live' ? 'bg-success' : 'bg-secondary'}`}>
                      {tender.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default HomePage;
