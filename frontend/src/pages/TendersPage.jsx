// src/pages/TenderPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TendersPage.css';

const TenderPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    product: '',
    inviter: '',
    location: '',
  });

  // Sample filter options - replace with API data later
  const filterOptions = {
    categories: ['Construction', 'Medical', 'IT', 'Education', 'Transport'],
    products: ['Equipment', 'Services', 'Materials', 'Software', 'Consultancy'],
    inviters: ['Dhaka City Corporation', 'Health Ministry', 'Education Board', 'Primary Education Directorate'],
    locations: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet']
  };

  // Sample tender data - replace with API data later
  const tenders = {
    all: [
      {
        id: 'ETP-2023-201',
        title: 'Construction of Municipal Office Building',
        organization: 'Dhaka City Corporation',
        published: '2023-08-15',
        deadline: '2023-09-30',
        value: '৳12,50,00,000',
        status: 'active',
        category: 'Construction',
        product: 'Services',
        location: 'Dhaka'
      },
      {
        id: 'ETP-2023-198',
        title: 'Supply of Medical Equipment',
        organization: 'Health Ministry',
        published: '2023-08-10',
        deadline: '2023-09-25',
        value: '৳8,75,00,000',
        status: 'active',
        category: 'Medical',
        product: 'Equipment',
        location: 'Dhaka'
      },
      {
        id: 'ETP-2023-185',
        title: 'IT Infrastructure Upgrade',
        organization: 'Education Board',
        published: '2023-07-28',
        deadline: '2023-09-15',
        value: '৳5,20,00,000',
        status: 'active',
        category: 'IT',
        product: 'Software',
        location: 'Dhaka'
      }
    ],
    active: [
      {
        id: 'ETP-2023-201',
        title: 'Construction of Municipal Office Building',
        organization: 'Dhaka City Corporation',
        published: '2023-08-15',
        deadline: '2023-09-30',
        value: '৳12,50,00,000',
        status: 'active',
        category: 'Construction',
        product: 'Services',
        location: 'Dhaka'
      },
      {
        id: 'ETP-2023-198',
        title: 'Supply of Medical Equipment',
        organization: 'Health Ministry',
        published: '2023-08-10',
        deadline: '2023-09-25',
        value: '৳8,75,00,000',
        status: 'active',
        category: 'Medical',
        product: 'Equipment',
        location: 'Dhaka'
      }
    ],
    closed: [
      {
        id: 'ETP-2023-172',
        title: 'School Renovation Project',
        organization: 'Primary Education Directorate',
        published: '2023-06-20',
        deadline: '2023-08-05',
        value: '৳3,45,00,000',
        status: 'closed',
        category: 'Education',
        product: 'Services',
        location: 'Dhaka'
      }
    ]
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredTenders = tenders[activeTab].filter(tender => {
    // Text search
    const textMatch = 
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter search
    const categoryMatch = !searchFilters.category || tender.category === searchFilters.category;
    const productMatch = !searchFilters.product || tender.product === searchFilters.product;
    const inviterMatch = !searchFilters.inviter || tender.organization === searchFilters.inviter;
    const locationMatch = !searchFilters.location || tender.location === searchFilters.location;
    
    return textMatch && categoryMatch && productMatch && inviterMatch && locationMatch;
  });

  return (
    <div className="container-fluid tender-page-container">
      <div className="tender-header">
        <h1>Tender Opportunities</h1>
        <p>Browse and apply for available tenders</p>
      </div>

      <div className="row">
        {/* Search Filters Column */}
        <div className="col-md-3">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Search Filters</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Search Tenders</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-success">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">By Category</label>
                <select 
                  className="form-select"
                  name="category"
                  value={searchFilters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  {filterOptions.categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">By Product</label>
                <select 
                  className="form-select"
                  name="product"
                  value={searchFilters.product}
                  onChange={handleFilterChange}
                >
                  <option value="">All Products</option>
                  {filterOptions.products.map((product, index) => (
                    <option key={index} value={product}>{product}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">By Inviter</label>
                <select 
                  className="form-select"
                  name="inviter"
                  value={searchFilters.inviter}
                  onChange={handleFilterChange}
                >
                  <option value="">All Inviters</option>
                  {filterOptions.inviters.map((inviter, index) => (
                    <option key={index} value={inviter}>{inviter}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">By Location</label>
                <select 
                  className="form-select"
                  name="location"
                  value={searchFilters.location}
                  onChange={handleFilterChange}
                >
                  <option value="">All Locations</option>
                  {filterOptions.locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className="tender-tabs mb-3">
                <div className="btn-group w-100" role="group">
                  <button
                    className={`btn ${activeTab === 'all' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setActiveTab('all')}
                  >
                    All
                  </button>
                  <button
                    className={`btn ${activeTab === 'active' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setActiveTab('active')}
                  >
                    Active
                  </button>
                  <button
                    className={`btn ${activeTab === 'closed' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setActiveTab('closed')}
                  >
                    Closed
                  </button>
                </div>
              </div>

              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchFilters({
                    category: '',
                    product: '',
                    inviter: '',
                    location: '',
                  });
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tenders Table Column */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-header bg-dark">
              <h3 className="mb-0">Tenders List</h3>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-success">
                    <tr>
                      <th>Tender ID</th>
                      <th>Title</th>
                      <th>Organization</th>
                      <th>Published</th>
                      <th>Deadline</th>
                      <th>Value</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTenders.length > 0 ? (
                      filteredTenders.map((tender) => (
                        <tr key={tender.id}>
                          <td>{tender.id}</td>
                          <td>
                            <Link to={`/tenders/${tender.id}`} className="text-decoration-none">
                              {tender.title}
                            </Link>
                          </td>
                          <td>{tender.organization}</td>
                          <td>{tender.published}</td>
                          <td>{tender.deadline}</td>
                          <td>{tender.value}</td>
                          <td>
                            <span className={`badge ${tender.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                              {tender.status === 'active' ? 'Active' : 'Closed'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link 
                                to={`/tenders/${tender.id}`} 
                                className="btn btn-sm btn-outline-primary"
                              >
                                View
                              </Link>
                              {tender.status === 'active' && (
                                <button className="btn btn-sm btn-success">
                                  Apply
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          <i className="bi bi-exclamation-circle fs-4 text-muted"></i>
                          <p className="mb-0">No tenders found matching your search</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Showing {filteredTenders.length} of {tenders[activeTab].length} tenders
                </small>
                <nav aria-label="Tender pagination">
                  <ul className="pagination pagination-sm mb-0">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1">Previous</a>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderPage;