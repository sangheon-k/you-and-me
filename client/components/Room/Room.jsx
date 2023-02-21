import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../pages/_app';

const Room = ({ enteredRoomName }) => {
  const [nick, setNick] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('welcome', (roomName) => {
      console.log('room join welcome to', roomName);
      setMessageList((prev) => [...prev, 'someone join!']);
    });
  }, []);

  return (
    <div>
      <h1>Room {enteredRoomName}</h1>
      <ul>
        {messageList?.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      <form action='#none' onSubmit={(e) => e.preventDefault()}>
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

export default Room;
