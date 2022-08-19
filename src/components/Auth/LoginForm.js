import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useHttp from '../../Hook/useHttp';
import { authActions } from '../../store/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';

import classes from './LoginForm.module.css';
import EmailInput from '../Auth/AuthInput/EmailInput';
import PasswordInput from '../Auth/AuthInput/PasswordInput';
import LoadingSpinner from '../UI/LoadingSpinner';

const LoginForm = () => {
  const [loginFormValid, setLoginFormValid] = useState(false);
  const [btnAnimation, setBtnAnimation] = useState(false);
  const [newErr, setNewErr] = useState(null);
  const { isLoading, error, sendRequest } = useHttp();
  const enteredEmail = useSelector(state => state.auth.enteredEmail);
  const enteredPw = useSelector(state => state.auth.enteredPassword);
  const dispatch = useDispatch();

  // API KEY
  const FIREBASEAPIKEY = process.env.REACT_APP_FIREBASE_KEY;

  // useHTTP Config
  const requestConfig = {
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASEAPIKEY}`,
    method: 'POST',
    body: {
      email: enteredEmail,
      password: enteredPw,
      returnSecureToken: true,
    },
    headers: {
      'Content-type': 'application/json',
    },
  };

  // 에러 애니메이션 반복용
  useEffect(() => {
    setNewErr(error);
  }, [error]);

  // 로그인상태와 만료 시간 리덕스에 전달
  const dispatchLoginState = data => {
    const token = data.idToken;
    const expiresIn = data.expiresIn;
    const expirationTime = new Date(new Date().getTime() + +expiresIn * 1000);
    const expirationTimeString = expirationTime.toISOString();
    dispatch(authActions.isLogin({ token, expirationTimeString }));
  };

  // 로그인 요청 함수
  const loginSubmitHandler = async e => {
    e.preventDefault();
    await sendRequest(requestConfig, dispatchLoginState, 'home');
  };

  // formValid State
  const emailValid = useSelector(state => state.auth.emailValid);
  const passwordValid = useSelector(state => state.auth.passwordValid);

  useEffect(() => {
    setLoginFormValid(emailValid && passwordValid);
  }, [emailValid, passwordValid]);

  // 버튼 클릭 애니메이션
  const btnAnimationHandler = () => {
    setBtnAnimation(true);
    setTimeout(() => {
      setBtnAnimation(false);
    }, 1000);
  };

  // 이하 컴포넌트 요소 ///////////////////////
  const loadingSpinner = isLoading ? (
    <div className={classes.spin}>
      <LoadingSpinner />
    </div>
  ) : (
    <h2>GameBot</h2>
  );

  const button = loginFormValid ? (
    <button
      type="submit"
      className={btnAnimation ? classes.jump : ''}
      onClick={btnAnimationHandler}
    >
      로그인
    </button>
  ) : (
    <button type="submit" disabled>
      항목을 입력해주세요.
    </button>
  );

  let authComment = error;
  if (authComment === 'INVALID_PASSWORD' || authComment === 'EMAIL_NOT_FOUND') {
    authComment = 'INVALID_PASSWORD OR EMAIL_NOT_FOUND';
  }

  return (
    <main className={classes.login}>
      <form className={classes.loginForm} onSubmit={loginSubmitHandler}>
        {loadingSpinner}
        <div className={classes.formControls}>
          <div className={classes.formControl}>
            <EmailInput />
          </div>
          <div className={classes.formControl}>
            <PasswordInput />
          </div>
        </div>
        <div className={classes.btnCont}>{button}</div>
        <div className={classes.aCont}>
          <Link to={'/regi'}>
            GameBot 친구되기 <FontAwesomeIcon icon={faHandPointRight} />
          </Link>
        </div>
      </form>
      <div className={`${classes.sideMemo} ${newErr ? classes.show : ''}`}>
        <p>{authComment}</p>
      </div>
    </main>
  );
};
export default LoginForm;
