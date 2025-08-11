import React from 'react';
import { Link } from 'react-router-dom';

const VendorSidebarComponent = () => {
  // Get user from localStorage
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const user_type = user?.user_type || 'guest';

  return (
    <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
      <h4 className="mb-4">Dashboard</h4>
      <ul className="list-unstyled">

        {user_type === 'vendor' && (
          <>
            <li>
              <Link to="/vendor" className="text-white text-decoration-none">
                <i className="bi bi-speedometer2"></i> Overview
              </Link>
            </li>
            <li>
              <Link to="/vendor/tenders" className="text-white text-decoration-none">
                <i className="bi bi-file-earmark-text"></i> My Tenders
              </Link>
            </li>
            <li>
              <Link to="/vendor/bids" className="text-white text-decoration-none">
                <i className="bi bi-journal-check"></i> My Bids
              </Link>
            </li>
            <li>
              <Link to="/vendor/profile" className="text-white text-decoration-none">
                <i className="bi bi-person-circle"></i> Profile
              </Link>
            </li>
          </>
        )}

        {/* If guest or other user types */}
        {user_type !== 'vendor' && (
          <li>
            <Link to="/unauthorized" className="text-white text-decoration-none">
              <i className="bi bi-person-circle"></i> Profile
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default VendorSidebarComponent;
