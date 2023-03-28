import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNickName, saveNickName } from '@/src/reduxStore/room/roomSlice';
import { useSocket } from '@/src/hooks/useSocket';

const FormNickName = () => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.room.nickname.value);
  const nickNameRef = useRef();
  const isSavedNickName = useSelector((state) => state.room.nickname.isSaved);
  const { socket } = useSocket();

  useEffect(() => {
    !isSavedNickName && nickNameRef.current.focus();
  }, [isSavedNickName]);

  const handleChangeNickName = (e) => {
    console.log(e.target.value);
    dispatch(changeNickName(e.target.value));
  };

  const handleNickNameKeyDown = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    toggleSaveNickName();
  };

  const toggleSaveNickName = () => {
    dispatch(saveNickName(!isSavedNickName));
  };

  return (
    <div className='flex items-center justify-between w-full gap-6'>
      {isSavedNickName ? (
        <strong>
          nickname :{' '}
          <span className='ml-1 py-3 px-4 rounded-md border border-[#e0e0e0] bg-white  text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md'>
            {nickname}
          </span>
        </strong>
      ) : (
        <input
          type='text'
          name='nickname'
          placeholder='nick name'
          onChange={handleChangeNickName}
          onKeyDown={handleNickNameKeyDown}
          value={nickname}
          ref={nickNameRef}
          className='py-3 px-4 rounded-md border border-[#e0e0e0] bg-white  text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md'
          required
        />
      )}
      <button
        type='button'
        onClick={toggleSaveNickName}
        className='block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg md:inline-block'
      >
        {isSavedNickName ? 'edit' : 'save'}
      </button>
    </div>
  );
};

export default FormNickName;
