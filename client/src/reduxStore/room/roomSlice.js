import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickname: {
    value: '',
    isSaved: false,
  },
  roomname: '',
};

export const counterSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    changeNickName: (state, action) => {
      state.nickname.value = action.payload;
    },
    saveNickName: (state, action) => {
      state.nickname.isSaved = action.payload;
    },
    saveRoomName: (state, action) => {
      state.roomname = action.payload;
    },
  },
});

export const { changeNickName, saveNickName, saveRoomName } =
  counterSlice.actions;

export default counterSlice.reducer;
