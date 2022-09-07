import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useHttp from '../../Hook/useHttp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import metaImg from '../../asset/oasis.jpeg';
import classes from './ProfileMeta.module.css';

const ProfileMeta = props => {
  const [changeMode, setChangeMode] = useState(false);
  const [enteredNick, setEnteredNick] = useState('');
  const [validNick, setValidNick] = useState(true);
  const [send, setSend] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();

  const changeNickHandler = () => {
    setChangeMode(prev => !prev);
  };

  const requestConfig = {
    url: `https://gamesearch-3e27f-default-rtdb.firebaseio.com/users/${localStorage.getItem(
      'key'
    )}/nick.json`,
    method: 'PUT',
    body: enteredNick,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const nicknameReg = /^[가-힝A-Za-z0-9]{2,}$/;

  const submitNickHandler = e => {
    // 엔터
    if (e.keyCode === 13) {
      if (nicknameReg.test(e.target.value)) {
        setValidNick(true);
        setChangeMode(false);
        setEnteredNick(e.target.value);
        setSend(true);
      } else {
        setValidNick(false);
        setTimeout(() => setValidNick(true), 1000);
        setSend(false);
      }
    }
  };

  useEffect(() => {
    if (send) {
      sendRequest(requestConfig);
      localStorage.setItem('nick', enteredNick);
    }
  }, [sendRequest, changeMode, enteredNick]);

  return (
    <section className={classes.section}>
      <div className={classes.meta}>
        <img src={metaImg} alt="" />
        {changeMode ? (
          <div
            className={`${classes.changeBox} ${!validNick && classes.notValid}`}
          >
            <input
              type="text"
              onKeyUp={submitNickHandler}
              className={!validNick && classes.notValidInput}
            />
            <button onClick={changeNickHandler}>X</button>
          </div>
        ) : (
          <h3 onClick={changeNickHandler}>
            {localStorage.getItem('nick')}
            <FontAwesomeIcon icon={faPencil} className={classes.pencil} />
          </h3>
        )}
      </div>
      <div className={classes.recent}>
        <h2>최근 게시물</h2>
        <ul className={classes.ul}>
          <li>
            <Link to={'/'}>*미구현 더미 데이터</Link>
          </li>
          <li>
            <Link to={'/'}>안녕하세요 잘 부탁 드립니다.</Link>
          </li>
          <li>
            <Link to={'/'}>이 게임 재밌나요?</Link>
          </li>
          <li>
            <Link to={'/'}>이 게임 재밌나요?</Link>
          </li>
          <li>
            <Link to={'/'}>이 게임 재밌나요?</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProfileMeta;
