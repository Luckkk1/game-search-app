import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useHttp from '../../Hook/useHttp';

import classes from './GameCard.module.css';

const GameCard = props => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const {
    isLoading: sendLoading,
    error: sendError,
    sendRequest: sendGameData,
  } = useHttp();

  const {
    isLoading: deleteLoading,
    error: deleteError,
    sendRequest: deleteGameData,
  } = useHttp();

  const sendRequestConfig = {
    url: `https://gamesearch-3e27f-default-rtdb.firebaseio.com/users/${localStorage.getItem(
      'key'
    )}/library/${props.id}.json`,
    method: 'POST',
    body: {
      id: props.id,
      url: props.url,
      name: props.name,
      meta: props.metacritic,
    },
    headers: {
      'Content-type': 'application/json',
    },
  };

  const deleteRequestConfig = {
    url: `https://gamesearch-3e27f-default-rtdb.firebaseio.com/users/${localStorage.getItem(
      'key'
    )}/library/${props.id}.json`,
    method: 'DELETE',
  };

  let has = props.has;
  const addLibraryHandler = () => {
    props.onCheckClick(true);
    if (has) {
      deleteGameData(deleteRequestConfig);
    } else {
      sendGameData(sendRequestConfig);
    }
  };

  let meta = props.metacritic;
  let metaColor;
  // 메타스코어의 변화에 따른 숫자 색상의 변화
  if (meta >= 0 && meta < 40) metaColor = '#6c757d';
  if (meta >= 40 && meta < 60) metaColor = '#a7c957';
  if (meta >= 60 && meta < 80) metaColor = '#70e000';
  if (meta >= 80 && meta < 90) metaColor = '#38b000';
  if (meta >= 90 && meta <= 100) metaColor = '#028fde';

  const buttonContent =
    props.hasCheck && isLoggedIn ? (
      <button
        className={has ? `${classes.addBtn} ${classes.has} ` : classes.addBtn}
        onClick={addLibraryHandler}
      >
        {has ? 'v' : '+'}
      </button>
    ) : (
      ''
    );

  return (
    <div className={classes.cardCont}>
      <Link className={classes.card} to={`/app/${props.id}`}>
        <div className={classes.imgBox}>
          <img alt="" src={props.url} />
        </div>
        <div className={classes.description}>
          <p>{props.name}</p>
          <span
            style={
              metaColor ? { background: metaColor } : { background: '#6c757d' }
            }
          >
            {props.metacritic ? props.metacritic : 0}
          </span>
        </div>
      </Link>
      {buttonContent}
    </div>
  );
};

export default GameCard;
