import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Find() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]); // API로 받아온 데이터를 저장할 상태

  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://port-0-uhditknow-backend-m0z0hcc2db07a95e.sel4.cloudtype.app/got');
        const data = await response.json();
        
        // API 데이터를 우리의 형식에 맞게 변환
        const formattedData = data.map(item => ({
          id: item.id.toString(),
          title: item.title,
          info: item.detail,
          tags: [item.location, item.time], // location과 time을 태그로 사용
          image: "./images/temp.jpg", // 기본 이미지 사용
          imageText: "Related image",
          moreinfo: item.detail
        }));
        
        setItems(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행

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
          <div id="move-b-b"><Link to="/lost"><h5>분실물을 잃어버렸어요.</h5></Link></div>
        </div>
        <div id="find-list">
          {items.map(item => ( // temp 대신 items 사용
            <div key={item.id} className="container-l-f" onClick={() => openModal(item)}>
              <div className="info">
                <h4>{item.title}</h4>
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
          <div className="modal-con" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <div id="modal-b">
              <div id="img-tag">
                <img src={selectedItem.image} alt={selectedItem.imageText} className="img" />
                <div className="tags">
                  {selectedItem.tags.map(tag => <div className="tag" key={tag}><h6>{tag}</h6></div>)}
                </div>
              </div>
              <h4 id="title">{selectedItem.title}</h4>
              <p id="info">{selectedItem.info}</p>
              <p id="more">세부 설명</p>
              <p id="moreinfo">{selectedItem.moreinfo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Find;