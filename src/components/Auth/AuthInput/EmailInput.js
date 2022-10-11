import useValidate from '../../../Hook/useValidate';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from './EmailInput.module.css';
import { authActions } from '../../../store/auth';

const emailReg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
const emailValidator = enteredVal => emailReg.test(enteredVal);

const EmailInput = props => {
  const {
    inputFocus: emailFocus,
    inputError: emailError,
    enteredInput: enteredEmail,
    inputBlurHandler: emailBlurHandler,
    inputFocusHandler: emailFocusHandler,
    inputChangeHandler: emailChangeHandler,
  } = useValidate(emailValidator, 'Invalid form of email.');

  const dispatch = useDispatch();

  // 리덕스를 통해 error를 통합 => formValid를 이끌어냄
  useEffect(() => {
    // emailError에 값이 없을 때 => valid를 의미
    const validator = setTimeout(() => {
      dispatch(authActions.emailValidator({ emailError, enteredEmail }));
    }, 300);
    return () => {
      clearTimeout(validator);
    };
  }, [emailError, dispatch, enteredEmail, props]);

  // 에러인 경우의 스타일클래스
  const errorStyle = error =>
    `${classes.formControl} ${error ? classes.errorBox : ''}`;

  // 포커스 상태의 스타일 클래스
  const focusStyle = focus => (focus ? classes.focus : '');

  return (
    <div className={errorStyle(emailError)}>
      <label htmlFor="email" className={focusStyle(emailFocus)}>
        E-Mail<span className={classes.fill}>*</span>
      </label>
      <input
        type="text"
        id="email"
        value={enteredEmail}
        onFocus={emailFocusHandler}
        onBlur={emailBlurHandler}
        onChange={emailChangeHandler}
      />
      {emailError && <p className={classes.error}>{emailError}</p>}
    </div>
  );
};

export default EmailInput;
