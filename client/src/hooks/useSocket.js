import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('ws://localhost:8080');

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
