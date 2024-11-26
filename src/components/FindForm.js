import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function FindForm() {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const userName = localStorage.getItem('name');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    detail: '',
    time: '',
    img: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
    if (file) {
      setFormData(prev => ({
        ...prev,
        img1: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('file-input').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.detail || !formData.time || !formData.img1) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const token = localStorage.getItem('Authorization');
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('detail', formData.detail);
    formDataToSend.append('time', formData.time);
    formDataToSend.append('img1', formData.img1);

    try {
      const response = await fetch('http://3.37.99.30:8080/got/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('등록에 실패했습니다.');
      }

      alert('성공적으로 등록되었습니다!');
      navigate('/got');
    } catch (error) {
      console.error('Error:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Header />
      <main>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <h3><span className="pink">1. </span>제목을 입력해주세요.</h3>
            <input 
              className="textbox" 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="ex) SRC 1층에서 에어팟을 잃어버렸어요." 
            />
          </div>
          <div className="form">
            <h3><span className="pink">2. </span>찾은 곳을 입력해주세요.</h3>
            <input 
              className="textbox" 
              type="text" 
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="ex) SRC 1층 로비" 
            />
          </div>
          <div className="form">
            <h3><span className="pink">3. </span>날짜를 입력해주세요.</h3>
            <input 
              className="textbox" 
              type="date" 
              name="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </div>
          <div className="form">
            <h3><span className="pink">4. </span>세부 설명을 입력해주세요.</h3>
            <input 
              className="textbox" 
              type="text" 
              name="detail"
              value={formData.detail}
              onChange={handleInputChange}
              placeholder="ex) 에어팟을 src1층에서 주웠는데 피카츄스티커 붙여져있고 등등" 
            />
          </div>
          <div className="form">
            <h3><span className="pink">５. </span>사진을 첨부해주세요.</h3>
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

export default FindForm;