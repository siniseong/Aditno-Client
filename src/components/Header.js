import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to="/find">
            <img src="/images/logo.png" alt="Aditno" />
          </Link>
        </div>
        <div className="nav-login">
          <nav className="nav">
            <Link to="/find"><h6>홈</h6></Link>
            <Link to="/here"><h6>여기있어요</h6></Link>
          </nav>
          <div className="login">
            <Link to="/login"><h6>로그인</h6></Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;