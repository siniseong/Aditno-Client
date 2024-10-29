import React from 'react';
import { Link } from 'react-router-dom';

function FindForm() {
  return (
    <div>
      <header>
        <div className="header-container">
          <div className="logo">
            <img src="/images/logo.png" alt="Aditno" />
          </div>
          <div className="nav-login">
            <nav className="nav">
              <Link to="#"><h6>찾았다면/내꺼라면</h6></Link>
              <Link to="#"><h6>여기있어요</h6></Link>
            </nav>
            <div className="login">
              <Link to="#"><h6>로그인</h6></Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="move-b">
          <div id="move-b-p"><Link to="#"><h5>분실물을 찾았어요.</h5></Link></div>
          <div id="move-b-b"><Link to="/lost-form"><h5>분실물을 잃어버렸어요.</h5></Link></div>
        </div>
        <form>
          <div className="form">
            <h3><span className="pink">1. </span>제목을 입력해주세요.</h3>
            <input className="textbox" type="text" placeholder="ex) SRC 1층에서 에어팟을 잃어버렸어요." />
          </div>
          <div className="form">
            <h3><span className="pink">2. </span>소제목을 입력해주세요.</h3>
            <input className="textbox" type="text" placeholder="ex) 에어팟을 찾았는데 포켓몬 피카츄 스티커 붙여져있어요." />
          </div>
          <div className="form">
            <h3><span className="pink">3. </span>키워드를 입력해주세요.</h3>
            <input id="tagsIn" className="textbox" type="text" placeholder="ex) 에어팟 / 흰색 / 스티커" />
            <div id="tags" className="tags">
              <div className="tag"><h6>에어팟</h6></div>
              <div className="tag"><h6>흰색</h6></div>
              <div className="tag"><h6>스티커</h6></div>
            </div>
          </div>
          <div className="form">
            <h3><span className="pink">4. </span>세부 설명을 입력해주세요.</h3>
            <input className="textbox" type="text" placeholder="ex) 에어팟을 src1층에서 주웠는데 피카츄스티커 붙여져있고 등등" />
          </div>
          <div className="form">
            <h3><span className="pink">5. </span>사진을 첨부해주세요.</h3>
            <div id="drop-area">
              <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                <path d="M26.5 38C26.5 39.4 26.76 40.74 27.2 42H10.5C8.3 42 6.5 40.22 6.5 38V10C6.5 7.8 8.3 6 10.5 6H38.5C40.72 6 42.5 7.8 42.5 10V26.7C41.24 26.26 39.9 26 38.5 26V10H10.5V38H26.5ZM28.42 24.58L22.92 31.66L19 26.94L13.5 34H27.2C28 31.76 29.44 29.82 31.3 28.42L28.42 24.58ZM40.5 36V30H36.5V36H30.5V40H36.5V46H40.5V40H46.5V36H40.5Z" fill="#6C757D" />
              </svg>
              <p>이미지를 드래그 앤 드롭 또는 직접 업로드 해 주세요.</p>
              <input type="file" id="file-input" accept="image/*" style={{ display: 'none' }} />
              <img id="image-preview" src="" alt="업로드된 이미지" />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default FindForm;