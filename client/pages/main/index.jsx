import React, { useEffect, useRef, useState } from 'react';

const MainPage = () => {
  const [nick, setNick] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const socketUrl = 'ws://localhost:8080';
  let ws = useRef(null);

  /**
   * TODO
   * create Websocket call custom hook
   * edit nickname with server
   * change to socket.io
   */

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(socketUrl);

      ws.current.onopen = () => {
        console.log('Connected to Server ✅');
      };

      ws.current.onmessage = (message) => {
        console.log('New Message :', message.data);
        setMessageList((prev) => [...prev, message.data]);
      };

      ws.current.onclose = () => {
        console.log('Disconnected to Server ❌');
      };
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const isMessage = name === 'message';

    const sendData = {
      type: name,
      payload: isMessage ? message : nick,
    };

    ws.current.send(JSON.stringify(sendData));
    if (isMessage) {
      setMessage('');
    } else if (name === 'nickname') {
      setIsSaved(true);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <ul>
        {messageList.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      <form action='#none'>
        {isSaved ? (
          <input type='text' name='nickname' value={nick} readOnly />
        ) : (
          <input
            type='text'
            name='nickname'
            onChange={(e) => setNick(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            value={nick}
          />
        )}
        <button type='button'>{isSaved ? 'edit' : 'save'}</button>
        <input
          type='text'
          name='message'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          value={message}
        />
        <button type='submit'>send</button>
      </form>
    </div>
  );
};

export default MainPage;
