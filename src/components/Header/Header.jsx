import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/home_icon.png';

function Header() {
  return (
    <header className="header-container">
      <h1 className="header-item">Movie List</h1>
      <Link to="/" className="home-icon">
        <img src={homeIcon} alt="" />
      </Link>
    </header>
  );
}

export default Header;
