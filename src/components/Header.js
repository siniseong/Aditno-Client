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
      
      const requestData = {
        code: code
      };
      console.log('백엔드로 보내는 데이터:', requestData);
      
      fetch('http://port-0-uhditknow-backend-m0z0hcc2db07a95e.sel4.cloudtype.app/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData),
      })
      .then(async response => {
        console.log('서버 응답 상태:', response.status);
        console.log('서버 응답 헤더:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('서버 응답 내용:', responseText);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, response: ${responseText}`);
        }
        
        try {
          return JSON.parse(responseText);
        } catch (error) {
          console.error('JSON 파싱 에러:', error);
          console.log('파싱 시도한 텍스트:', responseText);
          throw error;
        }
      })
      .then(data => {
        console.log('백엔드 응답 데이터:', data);

        if (data.Authorization && data['x-refresh-token']) {
          localStorage.setItem('Authorization', data.Authorization);
          localStorage.setItem('x-refresh-token', data['x-refresh-token']);
          console.log('토큰 저장 완료:', {
            Authorization: localStorage.getItem('Authorization'),
            'x-refresh-token': localStorage.getItem('x-refresh-token')
          });
          setIsLoggedIn(true);
          window.location.href = '/find';
        } else {
          console.error('토큰이 응답에 없습니다:', data);
        }
      })
      .catch(error => {
        console.error('로그인 처리 실패:', error);
        console.error('에러 상세:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        localStorage.removeItem('Authorization');
        localStorage.removeItem('x-refresh-token');
        setIsLoggedIn(false);
      });
    } else {
      const token = localStorage.getItem('Authorization');
      console.log('저장된 토큰 확인:', token ? '있음' : '없음');
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
              <a href={`https://auth.bssm.app/oauth?clientId=7858c499&redirectURI=${encodeURIComponent('http://localhost:3000/find')}`}>
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