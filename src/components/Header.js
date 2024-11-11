import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    
    if (code) {
      console.log('받은 인증 코드:', code);
      
      fetch(`https://port-0-uhditknow-backend-m0z0hcc2db07a95e.sel4.cloudtype.app/oauth?code=${code}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(async response => {
        console.log('서버 응답 상태:', response.status);
        const responseText = await response.text();
        console.log('서버 응답 내용:', responseText);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, response: ${responseText}`);
        }
        
        return JSON.parse(responseText);
      })
      .then(data => {
        console.log('백엔드 응답:', data);

        if (data.Authorization && data['x-refresh-token']) {
          localStorage.setItem('Authorization', data.Authorization);
          localStorage.setItem('x-refresh-token', data['x-refresh-token']);
          console.log('토큰 저장 완료');
          setIsLoggedIn(true);
          window.location.href = '/find';
        } else {
          console.error('토큰이 응답에 없습니다:', data);
        }
      })
      .catch(error => {
        console.error('로그인 처리 실패:', error);
        localStorage.removeItem('Authorization');
        localStorage.removeItem('x-refresh-token');
        setIsLoggedIn(false);
      });
    } else {
      const token = localStorage.getItem('Authorization');
      setIsLoggedIn(!!token);
    }
  }, [location]);

  const handleLogout = () => {
    console.log('로그아웃 - 삭제될 토큰들:',
      'Authorization:', localStorage.getItem('Authorization'),
      'x-refresh-token:', localStorage.getItem('x-refresh-token')
    );
    localStorage.removeItem('Authorization');
    localStorage.removeItem('x-refresh-token');
    setIsLoggedIn(false);
    window.location.href = '/find';
  };

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
            {isLoggedIn ? (
              <h6 onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</h6>
            ) : (
              <a href={`https://auth.bssm.app/oauth?clientId=7858c499&redirectURI=${encodeURIComponent('http://localhost:3000/got')}`}>
                <h6>로그인</h6>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;