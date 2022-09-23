import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  writesLength: 0,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    getWritesLength(state, action) {
      state.writesLength = action.payload;
    },
  },
});

export const forumSliceActions = forumSlice.actions;

export default forumSlice.reducer;
