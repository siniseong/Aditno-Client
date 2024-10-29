import React, { useState } from 'react';

function Lost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const temp = [
    {
      id: "1",
      title: "에어팟 프로 오른쪽을 잃어버렸어요.",
      info: "에어팟 프로 2세대 오른쪽을 잃어버렸어요.",
      tags: ["1층", "에어팟", "2학년 4반 신희성"],
      image: "./images/temp.jpg",
      imageText: "Related image",
      moreinfo: "SRC 1층에서 에어팟 오른쪽 하나를 잃어버렸어요 흰색이에요"
    },
    {
      id: "2",
      title: "에어팟 프로 오른쪽을 잃어버렸어요.",
      info: "에어팟 프로 2세대 오른쪽을 잃어버렸어요.",
      tags: ["1층", "에어팟", "2학년 4반 신희성"],
      image: "./images/temp.jpg",
      imageText: "Related image",
      moreinfo: "SRC 1층에서 에어팟 오른쪽 하나를 잃어버렸어요 흰색이에요"
    },
    {
      id: "3",
      title: "에어팟 프로 오른쪽을 잃어버렸어요.",
      info: "에어팟 프로 2세대 오른쪽을 잃어버렸어요.",
      tags: ["1층", "에어팟", "2학년 4반 신희성"],
      image: "./images/temp.jpg",
      imageText: "Related image",
      moreinfo: "SRC 1층에서 에어팟 오른쪽 하나를 잃어버렸어요 흰색이에요"
    },
    {
      id: "4",
      title: "에어팟 프로 오른쪽을 잃어버렸어요.",
      info: "에어팟 프로 2세대 오른쪽을 잃어버렸어요.",
      tags: ["1층", "에어팟", "2학년 4반 신희성"],
      image: "./images/temp.jpg",
      imageText: "Related image",
      moreinfo: "SRC 1층에서 에어팟 오른쪽 하나를 잃어버렸어요 흰색이에요"
    }
  ];

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
              <a href="#"><h6>찾았다면/내꺼라면</h6></a>
              <a href="#"><h6>여기있어요</h6></a>
            </nav>
            <div className="login">
              <a href="#"><h6>로그인</h6></a>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="move-b">
          <div id="move-b-b"><a href="/find"><h5>분실물을 찾았어요.</h5></a></div>
          <div id="move-b-p"><a href="#"><h5>분실물을 잃어버렸어요.</h5></a></div>
        </div>
        <div id="lost-list">
          {temp.map(item => (
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
                <div className="tags">{selectedItem.tags.map(tag => <div className="tag" key={tag}><h6>{tag}</h6></div>)}</div>
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

export default Lost;