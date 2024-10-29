import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Lost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://port-0-uhditknow-backend-m0z0hcc2db07a95e.sel4.cloudtype.app/lookingfor');
        const data = await response.json();
        
        const formattedData = data.map(item => ({
          id: item.id.toString(),
          title: item.title,
          info: item.detail,
          location: item.location,
          tags: [item.location],
          image: "./images/temp.jpg",
          imageText: "Related image",
          moreinfo: item.detail
        }));
        
        setItems(formattedData);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
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
        <div className="register-button" style={registerButtonStyle}>
          <Link to="/lost-form" style={linkStyle}>
            ✏️ 등록하기
          </Link>
        </div>
        <div className="move-b">
          <div id="move-b-b">
            <Link to="/find"><h5>분실물을 찾았어요.</h5></Link>
          </div>
          <div id="move-b-p">
            <Link to="/lost"><h5>분실물을 잃어버렸어요.</h5></Link>
          </div>
        </div>
        <div id="lost-list">
          {items.map(item => (
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

const registerButtonStyle = {
  textAlign: 'right',
  padding: '20px 50px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '1.1rem',
  fontWeight: '500',
};

export default Lost;