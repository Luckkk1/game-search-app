import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nameValid: false,
  emailValid: false,
  passwordValid: false,
  formValid: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    nameValidator(state, action) {
      if (action.payload.nameError || !action.payload.enteredName) {
        state.nameValid = false;
      } else {
        state.nameValid = true;
      }
    },
    emailValidator(state, action) {
      if (action.payload.emailError || !action.payload.enteredEmail) {
        state.emailValid = false;
      } else {
        state.emailValid = true;
      }
    },
    passwordValidator(state, action) {
      if (action.payload.passwordError || !action.payload.enteredPassword) {
        state.passwordValid = false;
      } else {
        state.passwordValid = true;
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
