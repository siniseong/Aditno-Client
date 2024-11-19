import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../style.css';

function Lost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.37.99.30:8080/lookingfor');
        const data = await response.json();
        
        const formattedData = data.map(item => ({
          id: item.id.toString(),
          title: item.title,
          info: item.detail,
          location: item.location,
          tags: [item.location],
          image: "./images/picture.jpg",
          imageText: "이미지가 존재하지 않습니다.",
          moreinfo: item.detail
        }));
        
        setItems(formattedData);
      } catch (error) {
        console.error('어디선가 문제가 생겼습니다.', error);
      }
    };

    fetchData();
  }, []);

  const openModal = (item) => {
    console.log('Clicked item:', item);
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
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.imageText} 
                  className="img" 
                  style={{ 
                    maxWidth: '400px',
                    maxHeight: '400px',
                    objectFit: 'contain'
                  }} 
                />
                <div className="tags">
                  {selectedItem.tags.map(tag => (
                    <div 
                      className="tag" 
                      key={tag}
                      style={{
                        minWidth: '120px',
                        maxWidth: '200px',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        backgroundColor: '#6184CA',
                        color: 'white',
                        margin: '5px',
                        display: 'inline-block',
                        textAlign: 'center'
                      }}
                    >
                      <h6 style={{ margin: 0 }}>{tag}</h6>
                    </div>
                  ))}
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