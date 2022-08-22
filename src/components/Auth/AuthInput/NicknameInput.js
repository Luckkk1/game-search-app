import useValidate from '../../../Hook/useValidate';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from './NicknameInput.module.css';
import { authActions } from '../../../store/auth';

const nicknameReg = /^[가-힝A-Za-z0-9]{2,}$/;
const nickValidator = enteredVal => nicknameReg.test(enteredVal);

const NicknameInput = props => {
  const {
    inputFocus: nickFocus,
    inputError: nickError,
    enteredInput: enteredNick,
    inputBlurHandler: nickBlurHandler,
    inputFocusHandler: nickFocusHandler,
    inputChangeHandler: nickChangeHandler,
  } = useValidate(nickValidator, '올바른 닉네임을 입력해주세요.');

  const dispatch = useDispatch();
  // 리덕스를 통해 error를 통합 => formValid를 이끌어냄
  useEffect(() => {
    // nameError에 값이 없을 때 => valid를 의미
    const validator = setTimeout(() => {
      dispatch(authActions.nickValidator({ nickError, enteredNick }));
    }, 300);
    return () => {
      clearTimeout(validator);
    };
  }, [dispatch, nickError, enteredNick]);

  // 에러인 경우의 스타일클래스
  const errorStyle = error =>
    `${classes.formControl} ${error ? classes.errorBox : ''}`;

  // 포커스 상태의 스타일 클래스
  const focusStyle = focus => (focus ? classes.focus : '');

  return (
    <div className={errorStyle(nickError)}>
      <label htmlFor="name" className={focusStyle(nickFocus)}>
        닉네임<span className={classes.fill}>*</span>
      </label>
      <input
        type="text"
        id="nick"
        value={enteredNick}
        onFocus={nickFocusHandler}
        onBlur={nickBlurHandler}
        onChange={nickChangeHandler}
      />
      {nickError && <p className={classes.error}>{nickError}</p>}
    </div>
  );
};

export default NicknameInput;
