import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../style/Find.css';

function Find() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const refreshToken = localStorage.getItem('x-refresh-token');

        if (!token) {
          console.error('토큰이 없습니다');
          return;
        }

        const response = await fetch('http://3.37.99.30:8080/got', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'x-refresh-token': refreshToken,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.log('401 에러 발생: 세션이 만료되었습니다. 현재 토큰:', token);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('서버에서 받아온 데이터:', data);

        const formattedData = data.map((item) => ({
          id: item.id.toString(),
          title: item.title,
          info: item.detail,
          location: item.location,
          time: item.time,
          detail: item.detail,
          tags: [item.location, item.time],
          image: item.img,
          imageText: '이미지가 존재하지 않습니다.',
          writer: item.writer,
        }));

        setItems(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <Header />
      <main>
        <div className="register-button">
          <Link to="/findform" className="register-link">
            ✏️ 등록하기
          </Link>
        </div>
        <div className="move-b">
          <div id="move-b-p">
            <Link to="/got">
              <h5>분실물을 찾았어요.</h5>
            </Link>
          </div>
          <div id="move-b-b">
            <Link to="/lost">
              <h5>분실물을 잃어버렸어요.</h5>
            </Link>
          </div>
        </div>
        <div id="find-list">
          {items.map((item) => (
            <div key={item.id} className="container-l-f" onClick={() => openModal(item)}>
              <div className="info">
                <h4>
                  {item.title}{' '}
                  <span className="writer-info">(등록자: {item.writer})</span>
                </h4>
                <p>{item.info}</p>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <div className="tag" key={tag}>
                      <h6>{tag}</h6>
                    </div>
                  ))}
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
                <h4 id="title">{selectedItem.title}</h4>
                <p className="writer">등록자: {selectedItem.writer}</p>
                <p id="more">찾은 지역</p>
                <p id="moreinfo">{selectedItem.location}</p>
                <p id="more-time">찾은 시간</p>
                <p id="timeinfo">{selectedItem.time}</p>
                <p id="more-detail">세부 설명</p>
                <p id="detailinfo">{selectedItem.detail}</p>
              </div>
              <div id="img-tag">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.imageText}
                  className="img"
                />
              </div>
            </div>
            <div className="modal-buttons">
              <button className="modal-button">내꺼에요</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Find;
