import React, { useEffect } from 'react';

const MainPage = () => {
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080`);

    console.log(socket);

    socket.addEventListener('open', () => {
      console.log('Connected to Server ✅');
    });

    socket.addEventListener('message', (message) => {
      console.log('New Message :', message.data);
    });

    socket.addEventListener('close', () => {
      console.log('Disconnected to Server ❌');
    });

    setTimeout(() => {
      socket.send('hello send from Browser!');
    }, 3000);
  }, []);

  return <div style={{ height: '100vh' }}>MainPage</div>;
};

export default MainPage;
