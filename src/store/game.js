import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameListError: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setErrorState(state, action) {
      state.gameListError = action.payload;
    },
  },
});

export const gameSliceActions = gameSlice.actions;

export default gameSlice.reducer;
