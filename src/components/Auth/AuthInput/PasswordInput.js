import useValidate from '../../../Hook/useValidate';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import classes from './PasswordInput.module.css';
import { authActions } from '../../../store/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const passwordReg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
const passwordValidator = enteredVal => passwordReg.test(enteredVal);

const PasswordInput = props => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    inputFocus: passwordFocus,
    inputError: passwordError,
    enteredInput: enteredPassword,
    inputBlurHandler: passwordBlurHandler,
    inputFocusHandler: passwordFocusHandler,
    inputChangeHandler: passwordChangeHandler,
  } = useValidate(passwordValidator, '6자 이상, 특수문자 포함');

  const dispatch = useDispatch();

  // 리덕스를 통해 error를 통합 => formValid를 이끌어냄
  useEffect(() => {
    // passwordError에 값이 없을 때 => valid를 의미
    const validator = setTimeout(() => {
      dispatch(
        authActions.passwordValidator({ passwordError, enteredPassword })
      );
    }, 300);
    return () => {
      clearTimeout(validator);
    };
  }, [dispatch, passwordError, enteredPassword]);

  // 에러인 경우의 스타일클래스
  const errorStyle = error =>
    `${classes.formControl} ${error ? classes.errorBox : ''}`;

  // 포커스 상태의 스타일 클래스
  const focusStyle = focus => (focus ? classes.focus : '');

  // 패스워드 비밀번호 보이기/안보이기 토글
  const pwIconClickHandler = () => {
    setPasswordVisible(prevState => !prevState);
  };

  // 비밀번호 보이기/안보이기 아이콘
  const passwordVisibleIcon = !passwordVisible ? (
    <FontAwesomeIcon icon={faEyeSlash} className={classes.eyes} />
  ) : (
    <FontAwesomeIcon icon={faEye} className={classes.eyes} />
  );

  return (
    <div className={errorStyle(passwordError)}>
      <label htmlFor="password" className={focusStyle(passwordFocus)}>
        비밀번호<span className={classes.fill}>*</span>
      </label>
      <div className={classes.passwordIcon} onClick={pwIconClickHandler}>
        {passwordVisibleIcon}
      </div>
      <input
        type={passwordVisible ? 'text' : 'password'}
        id="password"
        value={enteredPassword}
        onFocus={passwordFocusHandler}
        onBlur={passwordBlurHandler}
        onChange={passwordChangeHandler}
      />
      {passwordError && <p className={classes.error}>{passwordError}</p>}
    </div>
  );
};

export default PasswordInput;
