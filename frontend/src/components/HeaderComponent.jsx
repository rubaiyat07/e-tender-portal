// src/components/HeaderComponent.jsx
import React from 'react';
import NavbarComponent from './NavbarComponent';
import SearchBarComponent from './SearchBarComponent';
import './HeaderComponent.css';

const HeaderComponent = () => {
  return (
    <header>
      <NavbarComponent />
      <SearchBarComponent />
    </header>
  );
};

export default HeaderComponent;