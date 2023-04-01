import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/src/hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import { saveCountPeople } from '@/src/reduxStore/room/roomSlice';

const Room = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageListContainerRef = useRef();
  const roomName = useSelector((state) => state.room.roomname);
  const nickname = useSelector((state) => state.room.nickname);
  const totalPeopleNum = useSelector((state) => state.room.totalPeopleNum);
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('enterRoom', (message, countPeople) => {
      console.log('enterRoom', countPeople);
      setMessageList((prev) => [...prev, message]);
      dispatch(saveCountPeople(countPeople));
    });

    socket.on('leftRoom', (message, countPeople) => {
      console.log('leftRoom', countPeople);
      setMessageList((prev) => [...prev, message]);
      dispatch(saveCountPeople(countPeople));
    });

    socket.on('newMessage', (message) => {
      setMessageList((prev) => [...prev, message]);
    });

    return () => {
      socket.off('enterRoom');
      socket.off('leftRoom');
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
        setMessageList((prev) => [
          ...prev,
          { type: 'message', nickname, message },
        ]);
        setMessage('');
      });
    }
  };

  return (
    <div className=''>
      <h2 className='flex justify-between px-6 pt-6 pb-4 text-xl font-bold shadow-sm'>
        <span>Chatting Room : {roomName}</span>
        <span>{totalPeopleNum}</span>
      </h2>
      <div
        className='flex flex-col overflow-y-auto space-y-3 h-[600px] mb-4 px-6 pt-4'
        ref={messageListContainerRef}
      >
        {messageList?.map((item, index) => {
          const isMyMessage = item.nickname === nickname;
          console.log(item);
          return (
            // <div
            //   key={index}
            //   className={`${isMyMessage ? 'justify-end' : 'justify-start'}`}
            // >
            //   <span
            //     className={`block ${isMyMessage ? 'text-right' : 'text-left'}`}
            //   >
            //     {isMyMessage ? item.nickname.value : item.nickname}
            //   </span>
            //   <span
            //     className={`max-w-xs px-4 py-2 rounded-lg inline-block break-all ${
            //       isMyMessage
            //         ? 'rounded-br-none bg-blue-600 text-white'
            //         : 'rounded-bl-none bg-gray-300 text-gray-600'
            //     }`}
            //   >
            //     {item.message}
            //   </span>
            // </div>
            <div
              key={index}
              className={`flex flex-col ${
                isMyMessage ? 'items-end' : 'items-start'
              }`}
            >
              <span>{isMyMessage ? item.nickname.value : item.nickname}</span>
              <span
                className={`max-w-xs px-4 py-2 rounded-lg break-all ${
                  isMyMessage
                    ? 'rounded-br-none bg-blue-600 text-white'
                    : 'rounded-bl-none bg-gray-300 text-gray-600'
                }`}
              >
                {item.message}
              </span>
            </div>
          );
        })}
      </div>
      <div className='absolute bottom-0 p-6 bg-white'>
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
