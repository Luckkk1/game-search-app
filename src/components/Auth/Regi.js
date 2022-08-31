import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useHttp from '../../Hook/useHttp';

import classes from './Regi.module.css';
import EmailInput from './AuthInput/EmailInput';
import NameInput from './AuthInput/NameInput';
import PasswordInput from './AuthInput/PasswordInput';
import NationInput from './AuthInput/NationInput';
import LoadingSpinner from '../UI/LoadingSpinner';
import NicknameInput from './AuthInput/NicknameInput';

const Regi = () => {
  // 2개의 api가 존재 => 하나의 api의 결과에 따라 다른 하나의 호출여부가 결정되므로
  // 에러 state 최신화를 위하여 커스텀훅의 error를 사용하지 않고 로컬 State로 대체함
  // 단 위의 경우를 제외한 경우 ( ex) error가 바뀜에 따라 애니메이션 발동 )에는 error를 사용함
  const [formValid, setFormValid] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [btnAnimation, setBtnAnimation] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const {
    isLoading: DBLoading,
    error: __,
    sendRequest: DBSendRequest,
  } = useHttp();

  const nameValid = useSelector(state => state.auth.nameValid);
  const emailValid = useSelector(state => state.auth.emailValid);
  const passwordValid = useSelector(state => state.auth.passwordValid);
  const enteredEmail = useSelector(state => state.auth.enteredEmail);
  const enteredPw = useSelector(state => state.auth.enteredPassword);
  const enteredName = useSelector(state => state.auth.enteredName);
  const enteredNation = useSelector(state => state.auth.enteredNation);
  const enteredNick = useSelector(state => state.auth.enteredNick);
  const nickValid = useSelector(state => state.auth.nickValid);

  // API_KEY
  const FIREBASEAPIKEY = process.env.REACT_APP_FIREBASE_KEY;

  // FormValid State
  useEffect(() => {
    setFormValid(nameValid && emailValid && passwordValid && nickValid);
  }, [nameValid, emailValid, passwordValid, nickValid]);

  // useHTTP config - 회원가입
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
  // useHTTP config - DB
  const DBRequestConfig = {
    url: `https://gamesearch-3e27f-default-rtdb.firebaseio.com/users.json`,
    method: 'POST',
    body: {
      email: enteredEmail,
      name: enteredName,
      nation: enteredNation,
      nick: enteredNick,
    },
    headers: {
      'Content-type': 'application/json',
    },
  };

  const dummy = () => {};

  // 가입 요청 함수 (성공 시 DB에 정보 저장)
  const regiSubmitHandler = async e => {
    e.preventDefault();
    sendRequest(requestConfig, dummy, 'login').then(error => {
      if (!error) {
        DBSendRequest(DBRequestConfig);
      }
      setTimeout(() => {
        setRegisterError(null);
      }, 5000);
    });
  };

  // 에러 애니메이션 반복용
  useEffect(() => {
    setRegisterError(error);
  }, [error]);

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
    <h2>환영합니다!</h2>
  );

  const button = formValid ? (
    <button
      type="submit"
      className={btnAnimation ? classes.jump : ''}
      onClick={btnAnimationHandler}
    >
      계속
    </button>
  ) : (
    <button type="submit" disabled>
      항목을 입력해주세요
    </button>
  );

  return (
    <main className={classes.regi}>
      <form className={classes.form} onSubmit={regiSubmitHandler}>
        {loadingSpinner}
        <NationInput />
        <NameInput />
        <NicknameInput />
        <EmailInput />
        <PasswordInput />
        <div className={classes.btnCont}>{button}</div>
        <p className={classes.p}>
          이미 계정이 있으신가요?
          <Link to="/login">로그인</Link>
        </p>
      </form>
      <div
        className={`${classes.sideMemo} ${registerError ? classes.show : ''}`}
      >
        {registerError}
      </div>
    </main>
  );
};

export default Regi;
