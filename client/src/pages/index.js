import React from 'react';
import ChatPage from '@/src/components/Chat/ChatPage';

const HomePage = () => {
  return (
    <div className='flex justify-center items-center h-full bg-slate-100'>
      <ChatPage />
    </div>
  );
};

export default HomePage;

/**
 * TODO
 * create Websocket call custom hook
 * edit nickname with server
 */
