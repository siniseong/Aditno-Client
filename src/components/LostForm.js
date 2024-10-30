import React, { useState } from 'react';
import Header from './Header';

function LostForm() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim() !== '') {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('이미지 파일만 업로드 가능합니다.');
    }
  };

  const handleImageClick = () => {
    document.getElementById('file-input').click();
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
                  <div key={index} style={tagStyle}>
                    <span style={tagTextStyle}>{tag}</span>
                    <span 
                      onClick={() => removeTag(index)}
                      style={closeButtonStyle}
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form">
            <h3><span className="pink">4. </span>잃어버린 장소를 알려주세요.</h3>
            <input className="textbox" type="text" placeholder="ex) 도서관" />
          </div>
          <div className="form">
            <h3><span className="pink">5. </span>사진을 첨부해주세요.</h3>
            <div 
              id="drop-area" 
              style={dropAreaStyle}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleImageClick}
            >
              {!imagePreview ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                    <path d="M26.5 38C26.5 39.4 26.76 40.74 27.2 42H10.5C8.3 42 6.5 40.22 6.5 38V10C6.5 7.8 8.3 6 10.5 6H38.5C40.72 6 42.5 7.8 42.5 10V26.7C41.24 26.26 39.9 26 38.5 26V10H10.5V38H26.5ZM28.42 24.58L22.92 31.66L19 26.94L13.5 34H27.2C28 31.76 29.44 29.82 31.3 28.42L28.42 24.58ZM40.5 36V30H36.5V36H30.5V40H36.5V46H40.5V40H46.5V36H40.5Z" fill="#6C757D" />
                  </svg>
                  <p>이미지를 드래그 앤 드롭 또는 직접 업로드 해 주세요.</p>
                </>
              ) : (
                <img 
                  src={imagePreview} 
                  alt="업로드된 이미지" 
                  style={imagePreviewStyle}
                />
              )}
              <input 
                type="file" 
                id="file-input" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleFileInput}
              />
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

const tagStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#6184CA',
  color: '#FFF',
  padding: '8px 12px',
  borderRadius: '20px',
  margin: '4px',
};

const tagTextStyle = {
  margin: 0,
  fontSize: '14px'
};

const closeButtonStyle = {
  color: '#FFF',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: 'bold',
  marginLeft: '8px',
  display: 'inline-block'
};

const dropAreaStyle = {
  width: '100%',
  minHeight: '200px',
  border: '2px dashed #6C757D',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: '20px',
  boxSizing: 'border-box'
};

const imagePreviewStyle = {
  maxWidth: '100%',
  maxHeight: '300px',
  objectFit: 'contain'
};

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

export default LostForm;