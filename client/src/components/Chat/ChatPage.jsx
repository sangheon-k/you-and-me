import React from 'react';
import { useSelector } from 'react-redux';
import Room from '@/src/components/Chat/Room/Room';
import Join from './Join/Join';

const ChatPage = () => {
  const isEnteredRoom = useSelector((state) => state.room.isEnteredRoom);
  return (
    <div className='flex items-center justify-center h-full'>
      {!isEnteredRoom ? <Join /> : <Room />}
    </div>
  );
};

export default ChatPage;
