import React from 'react';
import ChatPage from '@/src/components/Chat/ChatPage';

const HomePage = () => {
  return (
    <main className='w-full h-full overflow-hidden bg-slate-100'>
      <ChatPage />
    </main>
  );
};

export default HomePage;

/**
 * TODO
 * create Websocket call custom hook
 * edit nickname with server
 */
