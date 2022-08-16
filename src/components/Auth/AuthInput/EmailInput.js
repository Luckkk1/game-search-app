import useValidate from '../../../Hook/useValidate';

import classes from './EmailInput.module.css';

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
  } = useValidate(emailValidator, '잘못된 양식의 이메일입니다.');

  // 에러인 경우의 스타일클래스
  const errorStyle = error =>
    `${classes.formControl} ${error ? classes.errorBox : ''}`;

  // 포커스 상태의 스타일 클래스
  const focusStyle = focus => (focus ? classes.focus : '');

  return (
    <div className={errorStyle(emailError)}>
      <label htmlFor="email" className={focusStyle(emailFocus)}>
        이메일<span className={classes.fill}>*</span>
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
