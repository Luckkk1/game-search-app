import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import gameReducer from './game';
import forumReducer from './forum';

const store = configureStore({
  reducer: { auth: authReducer, game: gameReducer, forum: forumReducer },
});

export default store;
