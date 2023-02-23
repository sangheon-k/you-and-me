import { useSocket } from '@/src/hooks/useSocket';
import React, { useState } from 'react';

const FormNickName = () => {
  const [nick, setNick] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const { socket } = useSocket();

  const handleNickSave = (e) => {
    e.preventDefault();
    isSaved
      ? setIsSaved(false)
      : (socket.emit('nickname', nick), setIsSaved(true));
  };

  return (
    <div>
      {isSaved ? (
        <strong>nickname : {nick}</strong>
      ) : (
        <input
          type='text'
          name='nickname'
          onChange={(e) => setNick(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleNickSave(e)}
          value={nick}
          required
        />
      )}
      <button type='button' onClick={handleNickSave}>
        {isSaved ? 'edit' : 'save'}
      </button>
    </div>
  );
};

export default FormNickName;
