import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Here() {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sensor/status', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received sensor data:', data);
        setSensorData(data);
        setError(false);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        setError(true);
      }
    };

    fetchData();
  }, []);

  const messageStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 50px)', 
    fontSize: '50px',
    fontWeight: 'bold',
    color: '#000',
    marginTop: '-50px'
  };

  const statusTextStyle = {
    fontSize: '20px',
    color: '#666',
    marginTop: '10px'
  };

  const buttonStyle = {
    width: '200px',  
    height: '50px',  
    fontSize: '20px',
    backgroundColor: '#6184CA',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div>
      <Header />
      {error ? (
        <div style={messageStyle}>
          <img 
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Anxious%20Face%20with%20Sweat.png" 
            alt="Anxious Face with Sweat" 
            width="200" 
            height="200" 
            style={{ marginBottom: '20px' }}
          />
          이런! 데이터가 존재하지 않습니다.
          <button 
            onClick={() => navigate('/find')}
            style={buttonStyle}
          >
            홈으로 돌아가기
          </button>
        </div>
      ) : (
        sensorData && (
          <div style={messageStyle}>
            {Number(sensorData.status) === 0 ? (
              <>
                <img 
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Open%20Mailbox%20with%20Lowered%20Flag.png" 
                  alt="Empty Locker" 
                  width="200" 
                  height="200" 
                  style={{ marginBottom: '20px' }}
                />
                사물함이 비어있습니다.
                <div style={statusTextStyle}>
                  {`status: ${sensorData.status} (사물함이 비어있어요.)`}
                </div>
              </>
            ) : (
              <>
                <img 
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Package.png" 
                  alt="Full Locker" 
                  width="200" 
                  height="200" 
                  style={{ marginBottom: '20px' }}
                />
                사물함에 물건이 있습니다.
                <div style={statusTextStyle}>
                  {`status: ${sensorData.status} (사물함에 물건이 있어요.)`}
                </div>
              </>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Here;