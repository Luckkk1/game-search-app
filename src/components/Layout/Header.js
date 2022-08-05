import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import SearchBar from '../UI/SeachBar';
import classes from './Header.module.css';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchToggleHandler = () => {
    setIsSearching(prevState => !prevState);
  };

  // 로그인 여부에 따른 nav메뉴 상태
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
      <nav className={classes.nav}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={`${classes.icon} ${isSearching && classes.showIcon}`}
          onClick={searchToggleHandler}
        />
        <SearchBar
          className={`${classes.search} ${isSearching && classes.showSearch}`}
        />
        {content}
      </nav>
    </header>
  );
};

export default Header;
