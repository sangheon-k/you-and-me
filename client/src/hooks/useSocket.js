import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://warm-anchorage-92066.herokuapp.com/');

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on('connection');

    return () => {
      socket.off('connection');
    };
  }, []);

  return { socket, isConnected };
};
