import FormNickName from '@/src/components/FormNickName';
import Room from '@/src/components/Room/Room';
import React, { useState } from 'react';
import { useSocket } from '../../hooks/useSocket';

const MainPage = () => {
  const { socket } = useSocket();
  const [roomName, setRoomName] = useState('');
  const [enteredRoomName, setEnteredRoomName] = useState('');
  const [isEnterRoom, setIsEnterRoom] = useState(false);

  const moveToRoom = (roomName) => {
    setIsEnterRoom(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnteredRoomName(roomName);
    socket.emit('enterRoom', roomName, moveToRoom);
    setRoomName('');
  };

  return (
    <div style={{ height: '100vh' }}>
      {!isEnterRoom && (
        <>
          <form action='' onSubmit={handleSubmit}>
            <FormNickName />
            <input
              type='text'
              placeholder='room name'
              onChange={(e) => setRoomName(e.target.value)}
              value={roomName}
              required
            />
            <button type='submit'>Enter Room</button>
          </form>
        </>
      )}
      {isEnterRoom && <Room enteredRoomName={enteredRoomName} />}
    </div>
  );
};

export default MainPage;

/**
 * TODO
 * create Websocket call custom hook
 * edit nickname with server
 */
