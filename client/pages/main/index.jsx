import Room from '@/components/Room/Room';
import React, { useContext, useState } from 'react';
import { SocketContext } from '../_app';

const MainPage = () => {
  const socket = useContext(SocketContext);
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
        <form action='' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='room name'
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            required
          />
          <button type='submit'>Enter Room</button>
        </form>
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
