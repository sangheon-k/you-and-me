import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickName: '',
  roomName: '',
};

export const counterSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    saveNickName: (state, action) => {
      state.nickName = action.payload;
    },
    saveRoomName: (state, action) => {
      state.roomName = action.payload;
    },
  },
});

export const { saveNickName, saveRoomName } = counterSlice.actions;

export default counterSlice.reducer;
