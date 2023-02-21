import io from 'socket.io-client';
import { createContext, useEffect } from 'react'
import '@/styles/globals.css'
import Head from 'next/head';

export const SocketContext = createContext()

export default function App({ Component, pageProps }) {

  const socket = io('ws://localhost:8080', {
    reconnectionDelayMax: 3000,
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('connection', (msg) => console.log(msg));
  });
  
  return (
    <SocketContext.Provider value={socket}>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/mvp.css@1.12/mvp.css" /> 
      </Head>
      <Component {...pageProps} />
    </SocketContext.Provider>
  )
}
