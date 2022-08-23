import { useEffect, useState, Fragment, memo } from 'react';

import useFetchList from '../../Hook/useFetchList';
import GameCard from './GameCard';
import classes from './GameList.module.css';
import LoadingSpinner from './LoadingSpinner';
import LinkBtn from './LinkBtn';

const GameList = props => {
  const [cards, setCards] = useState([]);
  const {
    isLoading,
    error,
    success,
    sendRequest: fetchGameList,
  } = useFetchList();

  useEffect(() => {
    fetchGameList(props.url, setCards);
  }, [props.url, fetchGameList]);

  let gameList = cards.map(game => (
    <GameCard
      name={game.name}
      url={game.img}
      key={game.id}
      metacritic={game.metacritic}
      id={game.id}
    />
  ));

  let content;

  if (error)
    content = (
      <div className="centered">
        <p className={classes.error}>불러오기가 실패했습니다.</p>
      </div>
    );

  if (isLoading)
    content = (
      <div className="centered">
        <LoadingSpinner className="centered" />
      </div>
    );

  if (success) content = <div className={classes.list}>{gameList}</div>;

  if (!gameList.length) {
    if (props.check === 'series') {
      return '';
    }
  }

  return (
    <section className={classes.games}>
      <Fragment>
        {props.link && (
          <LinkBtn className={classes.more} to={props.link}>
            더 보기
          </LinkBtn>
        )}
        <h2>{props.listName}</h2>
        {content}
      </Fragment>
    </section>
  );
};

export default memo(GameList);
