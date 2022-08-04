import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import classes from './Header.module.css';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const content = isLogin ? (
    <ul>
      <li>
        <NavLink to={'/file'}>프로필</NavLink>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <NavLink to={'/login'}>로그인</NavLink>
      </li>
      <li>
        <NavLink to={'/regi'}>회원가입</NavLink>
      </li>
    </ul>
  );

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to={'/home'}>GameBot</NavLink>
      </div>
      <nav className={classes.nav}>{content}</nav>
    </header>
  );
};

export default Header;
