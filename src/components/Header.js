import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <img src="/images/logo.png" alt="Aditno" />
        </div>
        <div className="nav-login">
          <nav className="nav">
            <Link to="/find"><h6>찾았다면/내꺼라면</h6></Link>
            <Link to="/lost"><h6>잃어버렸다면</h6></Link>
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