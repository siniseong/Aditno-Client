import React, { useState } from 'react';
import Header from './Header';

function FindForm() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim() !== '') {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  return (
    <div>
      <Header />
      <main>
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
            <input 
              id="tagsIn" 
              className="textbox" 
              type="text" 
              placeholder="키워드를 입력하고 Enter를 눌러주세요" 
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {tags.length > 0 && (
              <div id="tags" className="tags">
                {tags.map((tag, index) => (
                  <div className="tag" key={index}>
                    <h6>{tag}</h6>
                  </div>
                ))}
              </div>
            )}
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
          <div className="submit-button">
            <button type="submit" style={submitButtonStyle}>등록하기</button>
          </div>
        </form>
      </main>
    </div>
  );
}

const submitButtonStyle = {
  width: '610px',
  padding: '18px 0',
  marginTop: '50px',
  borderRadius: '13px',
  backgroundColor: '#6184CA',
  color: '#FFF',
  border: 'none',
  fontSize: '18px',
  fontWeight: '500',
  cursor: 'pointer',
};

export default FindForm;