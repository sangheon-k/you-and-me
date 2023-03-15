import React from 'react';

const FormEnterRoom = ({ roomName, setRoomName }) => {
  const handleChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <div className='pt-3'>
      <input
        type='text'
        placeholder='room name'
        onChange={handleChangeRoomName}
        value={roomName}
        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md'
        required
      />
    </div>
  );
};

export default FormEnterRoom;
