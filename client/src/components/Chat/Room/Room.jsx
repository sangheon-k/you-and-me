import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/src/hooks/useSocket';
import { useSelector } from 'react-redux';

const Room = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageListContainerRef = useRef();
  const roomName = useSelector((state) => state.room.roomname);
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

  useEffect(() => {
    messageListContainerRef.current.scrollTop =
      messageListContainerRef.current.scrollHeight;
  }, [messageList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== '') {
      socket.emit('newMessage', message, roomName, () => {
        setMessageList((prev) => [...prev, `You : ${message}`]); // 내가 보낸 메시지 리스트에 추가
        setMessage('');
      });
    }
  };

  return (
    <div>
      <h2 className='px-6 pt-6 pb-4 text-xl font-bold shadow-sm'>
        Chatting Room : {roomName}
      </h2>
      <div
        className='overflow-y-scroll h-[600px] mb-4 px-6 pt-4'
        ref={messageListContainerRef}
      >
        {messageList?.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
      <div className='px-6 pb-6'>
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
            className='block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg disabled:bg-gray-300 disabled:shadow-none md:inline-block'
            onClick={handleSubmit}
            disabled={message === ''}
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Room;
