import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../style/Lost.css';

function Lost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Authorization'); 
        const response = await fetch('http://3.37.99.30:8080/lookingfor', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        console.log('API 응답 데이터:', data); 
        
        const formattedData = data.map(item => ({
          id: item.id.toString(),
          title: item.title,
          info: item.detail,
          location: item.location,
          tags: [item.location],
          image: item.img || "./images/picture.jpg", 
          imageText: "이미지가 존재하지 않습니다.",
          moreinfo: item.detail,
          writer: item.writer
        }));
        
        setItems(formattedData);
      } catch (error) {
        console.error('어디선가 문제가 생겼습니다.', error);
      }
    };

    fetchData();
  }, []);

  const openModal = async (item) => {
    console.log('Clicked item:', item);
    setSelectedItem(item);
    setModalVisible(true);

    try {
      const token = localStorage.getItem('Authorization');
      const response = await fetch(`http://3.37.99.30:8080/lookingfor/${item.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('게시물 상세 데이터:', data);
        if (data && data.comments) {
          setComments(data.comments);
        }
      }
    } catch (error) {
      console.error('게시물 상세 정보 가져오기 실패:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !selectedItem) {
      console.log('댓글을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('Authorization');
      const response = await fetch(`http://3.37.99.30:8080/lookingfor/${selectedItem.id}/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment })
      });

      if (response.ok) {
        const commentsResponse = await fetch(`http://3.37.99.30:8080/lookingfor/${selectedItem.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          console.log('업데이트된 전체 댓글 목록:', commentsData);
          if (commentsData && commentsData.comments) {
            setComments(commentsData.comments);
          }
        }
        
        setNewComment('');
      }
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="register-button" style={registerButtonStyle}>
          <Link to="/lostform" style={linkStyle}>
            ✏️ 등록하기
          </Link>
        </div>
        
        <div className="move-b">
          <div id="move-b-b">
            <Link to="/got"><h5>분실물을 찾았어요.</h5></Link>
          </div>
          <div id="move-b-p">
            <Link to="/lost"><h5>분실물을 잃어버렸어요.</h5></Link>
          </div>
        </div>
        <div id="lost-list">
          {items.map(item => (
            <div key={item.id} className="container-l-f" onClick={() => openModal(item)}>
              <div className="info">
                <h4>{item.title} <span style={{ fontSize: '0.8rem', color: '#666' }}>(등록자: {item.writer})</span></h4>
                <p>{item.info}</p>
                <div className="tags">
                  {item.tags.map(tag => <div className="tag" key={tag}><h6>{tag}</h6></div>)}
                </div>
              </div>
              <div className="info-img">
                <img src={item.image} alt={item.imageText} />
              </div>
            </div>
          ))}
        </div>
      </main>
      {modalVisible && selectedItem && (
        <div id="modalBg" className="modal" onClick={closeModal}>
          <div className="modal-con" onClick={(e) => e.stopPropagation()}>
            <div id="modal-b">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 id="title">{selectedItem.title}</h4>
                  <p className="writer">등록자: {selectedItem.writer}</p>
                  <p id="more">잃어버린 지역</p>
                  <p id="moreinfo">{selectedItem.location}</p>
                  <p id="more-detail">세부 설명</p>
                  <p id="detailinfo">{selectedItem.moreinfo}</p>
                </div>
                
                <div className="comments-section">
                  <p style={{ marginLeft: '-10px', fontSize: '24px', fontWeight: '600', marginTop: '20px'   }}>댓글</p>
                  <div className="comment-list">
                    {Array.isArray(comments) && comments.map((comment, index) => (
                      <div key={index} className="comment-item">
                        <p className="comment-writer">작성자: {comment.writer}</p>
                        <p className="comment-content">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div id="img-tag">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.imageText}
                  className="img"
                />
              </div>
            </div>
            <div className="comment-input">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
              />
              <button onClick={handleCommentSubmit}>작성</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const registerButtonStyle = {
  textAlign: 'left',
  padding: '50px 0 0 300px',  
  marginBottom: '-40px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '1.1rem',
  fontWeight: '500',
};

export default Lost;