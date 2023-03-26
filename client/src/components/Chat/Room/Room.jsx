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
      <div className=' overflow-y-scroll h-[600px] py-3'>
        {messageList?.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
      <form
        action='#none'
        className='flex gap-4'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type='text'
          name='message'
          className='w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === 'Enter' &&
            e.nativeEvent.isComposing === false &&
            handleSubmit(e)
          }
          value={message}
        />
        <button
          type='submit'
          className='block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg md:inline-block'
          onClick={handleSubmit}
        >
          send
        </button>
      </form>
    </div>
  );
};

export default Room;
