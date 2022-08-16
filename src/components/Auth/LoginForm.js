import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';

import classes from './LoginForm.module.css';
import EmailInput from '../Auth/AuthInput/EmailInput';
import PasswordInput from '../Auth/AuthInput/PasswordInput';

const LoginForm = () => {
  return (
    <main className={classes.login}>
      <form className={classes.loginForm}>
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
          <button type="submit">로그인</button>
        </div>
        <div className={classes.aCont}>
          <Link to={'/regi'}>
            GameBot 친구되기 <FontAwesomeIcon icon={faHandPointRight} />
          </Link>
        </div>
      </form>
    </main>
  );
};
export default LoginForm;
