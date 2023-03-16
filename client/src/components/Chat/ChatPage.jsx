import React, { useState } from 'react';
import Room from '@/src/components/Chat/Room/Room';
import FormNickName from './FormNickName';
import FormEnterRoom from './FormEnterRoom';
import { useSocket } from '@/src/hooks/useSocket';
import { ToastError } from '@/src/utils/toast';

const ChatPage = () => {
  const [roomName, setRoomName] = useState('');
  const [enteredRoomName, setEnteredRoomName] = useState('');
  const [isEnterRoom, setIsEnterRoom] = useState(false);

  const { socket, isConnected } = useSocket();

  const moveToRoom = (roomName) => {
    setIsEnterRoom(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConnected) {
      ToastError('서버 연결을 다시 확인해주세요.');
      return;
    }

    setEnteredRoomName(roomName);
    socket.emit('enterRoom', roomName, moveToRoom);
    setRoomName('');
  };

  return (
    <div className='p-6 bg-white rounded-xl '>
      <h2 className='text-3xl font-bold text-center'>Chat Room</h2>
      {!isEnterRoom && (
        <form action='' onSubmit={handleSubmit} className='pt-6 text-center'>
          <FormNickName />
          <FormEnterRoom roomName={roomName} setRoomName={setRoomName} />
          <button
            type='submit'
            className='block px-6 py-3 mt-6 text-white bg-blue-500 rounded-lg shadow-lg md:inline-block'
          >
            Enter Room
          </button>
        </form>
      )}
      {isEnterRoom && <Room enteredRoomName={enteredRoomName} />}
      {/* <RoomTest /> */}
    </div>
  );
};

export default ChatPage;
