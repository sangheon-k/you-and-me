import { useSocket } from '@/src/hooks/useSocket';
import React, { useEffect, useState } from 'react';

const Room = ({ enteredRoomName }) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('welcome', (user) => {
      setMessageList((prev) => [...prev, `${user} join!`]);
    });

    socket.on('bye', (user) => {
      setMessageList((prev) => [...prev, `${user} left this room ㅠㅠ`]);
    });

    socket.on('newMessage', (message) => {
      setMessageList((prev) => [...prev, message]); // 남이 보낸 메시지 리스트에 추가
    });

    return () => {
      socket.off('welcome');
      socket.off('bye');
      socket.off('newMessage');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('newMessage', message, enteredRoomName, () => {
      setMessageList((prev) => [...prev, `You : ${message}`]); // 내가 보낸 메시지 리스트에 추가
      setMessage('');
    });
  };

  return (
    <div>
      <h1>Room {enteredRoomName}</h1>
      <ul>
        {messageList?.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      <form action='#none' onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          name='message'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === 'Enter' &&
            e.nativeEvent.isComposing === false &&
            handleSubmit(e)
          }
          value={message}
        />
        <button type='submit' onClick={handleSubmit}>
          send
        </button>
      </form>
    </div>
  );
};

export default Room;
