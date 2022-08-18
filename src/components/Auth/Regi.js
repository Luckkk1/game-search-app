import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useHttp from '../../Hook/useHttp';

import classes from './Regi.module.css';
import EmailInput from './AuthInput/EmailInput';
import NameInput from './AuthInput/NameInput';
import PasswordInput from './AuthInput/PasswordInput';
import NationInput from './AuthInput/NationInput';

const Regi = () => {
  const [formValid, setFormValid] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();
  const {
    isLoading: dataBaseLoading,
    error: dataBaseError,
    sendRequest: DBSendRequest,
  } = useHttp();

  const nameValid = useSelector(state => state.auth.nameValid);
  const emailValid = useSelector(state => state.auth.emailValid);
  const passwordValid = useSelector(state => state.auth.passwordValid);
  const enteredEmail = useSelector(state => state.auth.enteredEmail);
  const enteredPw = useSelector(state => state.auth.enteredPassword);
  const enteredName = useSelector(state => state.auth.enteredName);
  const enteredNation = useSelector(state => state.auth.enteredNation);

  const FIREBASEAPIKEY = process.env.REACT_APP_FIREBASE_KEY;

  useEffect(() => {
    setFormValid(nameValid && emailValid && passwordValid);
  }, [nameValid, emailValid, passwordValid]);

  const dummy = () => {};
  // 회원가입
  const requestConfig = {
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASEAPIKEY}`,
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
  // DB에 이름, 국가 저장
  const DBRequestConfig = {
    url: `https://gamesearch-3e27f-default-rtdb.firebaseio.com/user.json`,
    method: 'POST',
    body: {
      email: enteredEmail,
      name: enteredName,
      nation: enteredNation,
    },
    headers: {
      'Content-type': 'application/json',
    },
  };

  const regiSubmitHandler = async e => {
    e.preventDefault();
    await sendRequest(requestConfig, dummy, 'login');
    if (!error) {
      await DBSendRequest(DBRequestConfig, dummy);
    }
  };

  return (
    <main className={classes.regi}>
      <form className={classes.form} onSubmit={regiSubmitHandler}>
        <h2>환영합니다!</h2>
        <NationInput />
        <NameInput />
        <EmailInput />
        <PasswordInput />
        <div className={classes.btnCont}>
          {formValid ? (
            <button type="submit">계속</button>
          ) : (
            <button type="submit" disabled>
              항목을 입력해주세요
            </button>
          )}
        </div>
        <p className={classes.p}>
          이미 계정이 있으신가요?
          <Link to="/login">로그인</Link>
        </p>
      </form>
    </main>
  );
};

export default Regi;
