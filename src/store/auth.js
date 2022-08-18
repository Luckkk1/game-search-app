import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nameValid: false,
  emailValid: false,
  passwordValid: false,
  enteredEmail: '',
  enteredPassword: '',
  enteredName: '',
  enteredNation: '',
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    enteredNation(state, action) {
      state.enteredNation = action.payload;
    },
    nameValidator(state, action) {
      state.enteredName = action.payload.enteredName;
      if (action.payload.nameError || !action.payload.enteredName) {
        state.nameValid = false;
      } else {
        state.nameValid = true;
      }
    },
    emailValidator(state, action) {
      state.enteredEmail = action.payload.enteredEmail;
      if (action.payload.emailError || !action.payload.enteredEmail) {
        state.emailValid = false;
      } else {
        state.emailValid = true;
      }
    },
    passwordValidator(state, action) {
      state.enteredPassword = action.payload.enteredPassword;
      if (action.payload.passwordError || !action.payload.enteredPassword) {
        state.passwordValid = false;
      } else {
        state.passwordValid = true;
      }
    },
    isLogin(state, action) {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('expire', action.payload.expirationTimeString);
      state.isLoggedIn = true;
    },
    isLogout(state) {
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('expire');
      state.isLoggedIn = false;
    },
    checkLoggedInState(state) {
      if (localStorage.getItem('token')) {
        state.isLoggedIn = true;
        // 자동 로그아웃 1시간
        const expire = localStorage.getItem('expire');
        const expirationTime = new Date(expire).getTime();
        const current = new Date().getTime();
        const remainingTime = expirationTime - current;
        if (remainingTime <= 60000) {
          localStorage.removeItem('token');
          localStorage.removeItem('expire');
          state.token = null;
          state.isLoggedIn = false;
        }
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
