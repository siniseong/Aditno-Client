import React, { useState, useEffect } from 'react';
import Header from './Header';

function Here() {
  const [sensorData, setSensorData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://port-0-prototype-m0p6660zb070e43c.sel4.cloudtype.app/sensor/status');
        const data = await response.json();
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
    height: '100vh',
    fontSize: '50px',
    fontWeight: 'bold',
    color: '#000'
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
        </div>
      ) : (
        sensorData && (
          <div style={messageStyle}>
            {sensorData.status === 0 ? (
              <>
                <img 
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Open%20Mailbox.png" 
                  alt="Empty Locker" 
                  width="200" 
                  height="200" 
                  style={{ marginBottom: '20px' }}
                />
                사물함이 비어있습니다.
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
              </>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Here;