import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import gameReducer from './game';

const store = configureStore({
  reducer: { auth: authReducer, game: gameReducer },
});

export default store;
