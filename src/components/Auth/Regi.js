import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import useValidate from '../../Hook/useValidate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { NationList } from './NationList';
import classes from './Regi.module.css';

const emailReg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
const nameReg = /^[가-힣a-zA-Z]/g;
const passwordReg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
const emailValidator = enteredVal => emailReg.test(enteredVal);
const nameValidator = enteredVal =>
  nameReg.test(enteredVal) && enteredVal.length >= 2;
const passwordValidator = enteredVal => passwordReg.test(enteredVal);

const Regi = () => {
  const [currentNation, setCurrentNation] = useState('');
  const [nationError, setNationError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // 유효성검사 커스텀훅
  const {
    inputFocus: nameFocus,
    inputError: nameError,
    enteredInput: enteredName,
    inputBlurHandler: nameBlurHandler,
    inputFocusHandler: nameFocusHandler,
    inputChangeHandler: nameChangeHandler,
  } = useValidate(nameValidator, '올바른 이름을 입력해주세요.');

  const {
    inputFocus: emailFocus,
    inputError: emailError,
    enteredInput: enteredEmail,
    inputBlurHandler: emailBlurHandler,
    inputFocusHandler: emailFocusHandler,
    inputChangeHandler: emailChangeHandler,
  } = useValidate(emailValidator, '잘못된 양식의 이메일입니다.');

  const {
    inputFocus: passwordFocus,
    inputError: passwordError,
    enteredInput: enteredPassword,
    inputBlurHandler: passwordBlurHandler,
    inputFocusHandler: passwordFocusHandler,
    inputChangeHandler: passwordChangeHandler,
  } = useValidate(passwordValidator, '6자 이상, 특수문자 포함');

  // 사용자의 현재 접속 국가 확인 API
  const reqeustCurrentNation = useCallback(async () => {
    try {
      const res = await fetch(
        'https://extreme-ip-lookup.com/json/?key=M3oG9awkhwAvOcDHlu1n'
      );
      const data = await res.json();
      if (data.country === '') {
        throw new Error();
      }
      setCurrentNation(data.country);
    } catch (err) {
      setNationError('수동으로 선택해 주세요.');
    }
  }, []);

  useEffect(() => {
    reqeustCurrentNation();
  }, [reqeustCurrentNation]);

  // 국가리스트
  const nationObtion = NationList.sort().map(e => {
    if (e === 'South Korea') {
      return (
        <option selected key={e}>
          {e}
        </option>
      );
    }
    return (
      <option defaultValue={'South Korea'} key={e}>
        {e}
      </option>
    );
  });

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
    <main className={classes.regi}>
      <form>
        <h2>환영합니다!</h2>
        <div className={classes.formControl}>
          <label htmlFor="nation" className={classes.focus}>
            국가 <span className={classes.fill}>*</span>
          </label>
          {!nationError ? (
            <input
              type="text"
              id="nation"
              value={nationError ? nationError : currentNation}
              disabled
            />
          ) : (
            <select name="nation" className={classes.nationSelect}>
              {nationObtion}
            </select>
          )}
        </div>
        <div className={errorStyle(nameError)}>
          <label htmlFor="name" className={focusStyle(nameFocus)}>
            성명<span className={classes.fill}>*</span>
          </label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onFocus={nameFocusHandler}
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
          />
          {nameError && <p className={classes.error}>{nameError}</p>}
        </div>
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
        <div className={classes.btnCont}>
          <button type="submit">계속</button>
        </div>
        <p>
          이미 계정이 있으신가요?
          <Link to="/login">로그인</Link>
        </p>
      </form>
    </main>
  );
};

export default Regi;
