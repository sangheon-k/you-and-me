import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastError } from '@/src/utils/toast';
import { useSocket } from '@/src/hooks/useSocket';
import { enterRoom } from '@/src/reduxStore/room/roomSlice';
import FormNickName from './FormNickName';
import FormEnterRoom from './FormEnterRoom';

export default function Join() {
  const dispatch = useDispatch();
  const roomName = useSelector((state) => state.room.roomname);
  const isEnteredRoom = useSelector((state) => state.room.isEnteredRoom);
  const { socket, isConnected } = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConnected) {
      ToastError('서버 연결을 다시 확인해주세요.');
      return;
    }
    socket.emit('enterRoom', roomName, moveToRoom);
  };

  const moveToRoom = () => {
    dispatch(enterRoom(!isEnteredRoom));
  };

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='bg-white rounded-xl min-w-[360px] p-6'>
        <form action='' onSubmit={handleSubmit} className='pt-6 text-center'>
          <FormNickName />
          <FormEnterRoom />
        </form>
      </div>
    </div>
  );
}
