// src/components/SidebarComponent.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaFileAlt, FaGavel, 
  FaChartLine, FaCog, FaSignOutAlt 
} from 'react-icons/fa';

const SidebarComponent = ({ user, isOpen, onClose }) => {
  // Common menu items for both roles
  const commonMenuItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/profile', icon: <FaCog />, label: 'Profile Settings' },
  ];

  // Admin-specific menu items
  const adminMenuItems = [
    { path: '/users', icon: <FaUsers />, label: 'User Management' },
    { path: '/tenders', icon: <FaFileAlt />, label: 'Tender Management' },
    { path: '/reports', icon: <FaChartLine />, label: 'Reports' },
  ];

  // Vendor-specific menu items
  const vendorMenuItems = [
    { path: '/my-bids', icon: <FaGavel />, label: 'My Bids' },
    { path: '/available-tenders', icon: <FaFileAlt />, label: 'Tenders' },
  ];

  const menuItems = [
    ...commonMenuItems,
    ...(user?.user_type === 'admin' ? adminMenuItems : vendorMenuItems)
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarComponent;