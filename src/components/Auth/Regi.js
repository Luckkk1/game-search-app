import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import classes from './Regi.module.css';
import EmailInput from './AuthInput/EmailInput';
import NameInput from './AuthInput/NameInput';
import PasswordInput from './AuthInput/PasswordInput';
import NationInput from './AuthInput/NationInput';

const Regi = () => {
  const [formValid, setFormValid] = useState(false);

  const nameValid = useSelector(state => state.auth.nameValid);
  const emailValid = useSelector(state => state.auth.emailValid);
  const passwordValid = useSelector(state => state.auth.passwordValid);

  useEffect(() => {
    setFormValid(nameValid && emailValid && passwordValid);
  }, [nameValid, emailValid, passwordValid]);

  return (
    <main className={classes.regi}>
      <form className={classes.form}>
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
