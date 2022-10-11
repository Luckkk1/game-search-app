import { useState, Fragment, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useHttp from '../../Hook/useHttp';

import useFetchList from '../../Hook/useFetchList';
import GameCard from './GameCard';
import classes from './GameList.module.css';
import LoadingSpinner from './LoadingSpinner';
import LinkBtn from './LinkBtn';
import { gameSliceActions } from '../../store/game';

let checker = false;

const GameList = props => {
  const [hasGame, setHasGame] = useState([]);
  const [cards, setCards] = useState([]);
  const [clickCheck, setClickCheck] = useState(false);
  const location = useLocation();
  const QueryParams = new URLSearchParams(location.search);
  const searchParams = QueryParams.get('q');
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    success,
    sendRequest: fetchGameList,
  } = useFetchList();

  const {
    isLoading: getLoading,
    error: getError,
    sendRequest: getGameData,
  } = useHttp();

  // for (let game of cards) {
  //   if (game.img) {
  //     game.img =
  //       game.img.replace(
  //         'https://media.rawg.io',
  //         'https://vjk4rlw6.tinifycdn.com'
  //       ) + '?resize.width=250&resize.height=160';
  //   }
  // }

  let arr = [];
  const getData = data => {
    for (let key in data) {
      arr.push(key);
    }
    setHasGame(arr);
  };

  useEffect(() => {
    getGameData(
      {
        url: `https://gamesearch-3e27f-default-rtdb.firebaseio.com/users/${localStorage.getItem(
          'key'
        )}/library.json`,
      },
      getData
    );
  }, [clickCheck, cards]);

  useEffect(() => {
    fetchGameList(props.url, setCards);
  }, [props.url, fetchGameList]);

  const clickCheckHandler = () => {
    setClickCheck(true);
    setTimeout(() => {
      setClickCheck(false);
    }, 300);
  };

  let gameList = cards.map(game => (
    <GameCard
      name={game.name}
      url={game.img}
      key={game.id}
      metacritic={game.metacritic}
      id={game.id}
      has={hasGame.map(e => +e).includes(game.id) ? true : false}
      hasCheck={true}
      onCheckClick={clickCheckHandler}
    />
  ));

  let content;

  if (success) {
    dispatch(gameSliceActions.setErrorState(false));
    content = <div className={classes.list}>{gameList} </div>;
  }

  if (error) {
    dispatch(gameSliceActions.setErrorState(true));
    content = (
      <div className="centered">
        <p className={classes.error}>
          {searchParams
            ? '검색된 결과가 없습니다.'
            : '불러오기가 실패했습니다.'}
        </p>
      </div>
    );
  }

  if (isLoading)
    content = (
      <div className="centered">
        <LoadingSpinner className="centered" />
      </div>
    );

  return (
    <section className={classes.games}>
      <Fragment>
        <div className={classes.name}>
          {props.listName && <h2>{props.listName}</h2>}
          {props.link && (
            <LinkBtn className={classes.more} to={props.link}>
              more
            </LinkBtn>
          )}
        </div>
        {content}
      </Fragment>
    </section>
  );
};

export default memo(GameList);
