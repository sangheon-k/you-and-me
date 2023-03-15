import { useSocket } from '@/src/hooks/useSocket';
import React, { useState } from 'react';

const FormNickName = () => {
  const [nick, setNick] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const { socket } = useSocket();

  const handleNickSave = (e) => {
    e.preventDefault();
    if (nick === '') {
      alert('닉네임을 입력해주세요!');
      return;
    }
    isSaved
      ? setIsSaved(false)
      : (socket.emit('nickname', nick), setIsSaved(true));
  };

  return (
    <div className='flex items-center justify-between w-full gap-6'>
      {isSaved ? (
        <strong>
          nickname :{' '}
          <span className='ml-1 py-3 px-4 rounded-md border border-[#e0e0e0] bg-white  text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md'>
            {nick}
          </span>
        </strong>
      ) : (
        <input
          type='text'
          name='nickname'
          placeholder='nick name'
          onChange={(e) => setNick(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleNickSave(e)}
          value={nick}
          className='py-3 px-4 rounded-md border border-[#e0e0e0] bg-white  text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md'
          required
        />
      )}
      <button
        type='button'
        onClick={handleNickSave}
        className='block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg md:inline-block'
      >
        {isSaved ? 'edit' : 'save'}
      </button>
    </div>
  );
};

export default FormNickName;
