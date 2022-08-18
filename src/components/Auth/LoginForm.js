import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useHttp from '../../Hook/useHttp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';

import classes from './LoginForm.module.css';
import EmailInput from '../Auth/AuthInput/EmailInput';
import PasswordInput from '../Auth/AuthInput/PasswordInput';
import { authActions } from '../../store/auth';

const LoginForm = () => {
  const [loginFormValid, setLoginFormValid] = useState(false);
  const [newErr, setNewErr] = useState(null);
  const { isLoading, error, sendRequest } = useHttp();

  const enteredEmail = useSelector(state => state.auth.enteredEmail);
  const enteredPw = useSelector(state => state.auth.enteredPassword);
  const dispatch = useDispatch();
  const FIREBASEAPIKEY = process.env.REACT_APP_FIREBASE_KEY;

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

  useEffect(() => {
    setNewErr(error);
  }, [error]);

  const dispatchLoginState = data => {
    const token = data.idToken;
    const expiresIn = data.expiresIn;
    const expirationTime = new Date(new Date().getTime() + +expiresIn * 1000);
    console.log(expiresIn);
    const expirationTimeString = expirationTime.toISOString();
    dispatch(authActions.isLogin({ token, expirationTimeString }));
  };

  const loginSubmitHandler = async e => {
    e.preventDefault();
    await sendRequest(requestConfig, dispatchLoginState, 'home');
  };

  const emailValid = useSelector(state => state.auth.emailValid);
  const passwordValid = useSelector(state => state.auth.passwordValid);

  useEffect(() => {
    setLoginFormValid(emailValid && passwordValid);
  }, [emailValid, passwordValid]);

  return (
    <main className={classes.login}>
      <form className={classes.loginForm} onSubmit={loginSubmitHandler}>
        <h2>GameBot</h2>
        <div className={classes.formControls}>
          <div className={classes.formControl}>
            <EmailInput />
          </div>
          <div className={classes.formControl}>
            <PasswordInput />
          </div>
        </div>
        <div className={classes.btnCont}>
          {loginFormValid ? (
            <button type="submit">로그인</button>
          ) : (
            <button type="submit" disabled>
              항목을 입력해주세요.
            </button>
          )}
        </div>
        <div className={classes.aCont}>
          <Link to={'/regi'}>
            GameBot 친구되기 <FontAwesomeIcon icon={faHandPointRight} />
          </Link>
        </div>
      </form>
      <div className={`${classes.sideMemo} ${newErr ? classes.show : ''}`}>
        <p>
          <span>아이디</span> 혹은 <span>비밀번호</span>가 일치하지 않습니다.
        </p>
      </div>
    </main>
  );
};
export default LoginForm;
