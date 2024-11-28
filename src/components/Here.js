import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import LockerModel from './LockerModel';

function Here() {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState(null);
  const [servoData, setServoData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensorResponse = await fetch('/sensor/status', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });

        const servoResponse = await fetch('/servo/status', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });

        if (!sensorResponse.ok || !servoResponse.ok) {
          throw new Error(`HTTP error!`);
        }

        const sensorData = await sensorResponse.json();
        const servoData = await servoResponse.json();
        
        console.log('Received sensor data:', sensorData);
        console.log('Received servo data:', servoData);
        
        setSensorData(sensorData);
        setServoData(servoData);
        setError(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const messageStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 'calc(100vh - 100px)',
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#000',
    marginTop: '260px'
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

  const modelContainerStyle = {
    width: '100%',
    height: 'auto',
    marginTop: '20px',
    marginBottom: '-200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1
  };

  const pageStyle = {
    width: '100%',
    height: '100vh',
    overflow: 'hidden'
  };

  return (
    <div style={pageStyle}>
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
            onClick={() => navigate('/got')}
            style={buttonStyle}
          >
            홈으로 돌아가기
          </button>
        </div>
      ) : (
        sensorData && servoData && (
          <div style={messageStyle}>
            <div style={modelContainerStyle}>
              <LockerModel 
                status1={sensorData[0].status} 
                status2={sensorData[1].status} 
                servoStatus={servoData.status} 
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Here;