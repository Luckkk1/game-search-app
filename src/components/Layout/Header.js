import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import SearchBar from '../UI/SeachBar';
import classes from './Header.module.css';
import { authActions } from '../../store/auth';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const searchToggleHandler = () => {
    setIsSearching(prevState => !prevState);
  };

  const logoutHandler = () => {
    dispatch(authActions.isLogout());
  };

  // 로그인 여부에 따른 nav메뉴 상태
  const content = isLoggedIn ? (
    <ul>
      <li>
        <NavLink to={'/profile'}>Profile</NavLink>
      </li>
      <li>
        <button onClick={logoutHandler}>Logout</button>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <NavLink to={'/login'} className={classes.login}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to={'/regi'} className={classes.regi}>
          Register
        </NavLink>
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
