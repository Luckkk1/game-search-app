import { Link } from 'react-router-dom';

import classes from './Regi.module.css';
import EmailInput from './AuthInput/EmailInput';
import NameInput from './AuthInput/NameInput';
import PasswordInput from './AuthInput/PasswordInput';
import NationInput from './AuthInput/NationInput';

const Regi = () => {
  return (
    <main className={classes.regi}>
      <form>
        <h2>환영합니다!</h2>
        <NationInput />
        <NameInput />
        <EmailInput />
        <PasswordInput />
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
