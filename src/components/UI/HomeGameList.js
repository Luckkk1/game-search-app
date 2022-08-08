import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useFetchList from '../../Hook/useFetchList';
import GameCard from '../UI/GameCard';
import classes from './HomeGameList.module.css';
import LoadingSpinner from './LoadingSpinner';

const HomeGameList = props => {
  const [cards, setCards] = useState([]);
  const { isLoading, error, sendRequest: fetchGameList } = useFetchList();

  useEffect(() => {
    fetchGameList(props.url, setCards);
  }, [props.url, fetchGameList]);

  let gameList = cards.map(game => (
    <GameCard
      name={game.name}
      url={game.img}
      key={game.id}
      metacritic={game.metacritic}
    />
  ));

  if (error) {
    return <p className={classes.error}>불러오기가 실패했습니다.</p>;
  }

  return (
    <section className={classes.games}>
      <Link className={classes.more} to={props.link}>
        더 보기
      </Link>
      <h2>{props.listName}</h2>
      {isLoading ? (
        <div className="centered">
          <LoadingSpinner className="centered" />
        </div>
      ) : (
        <div className={classes.list}>{gameList}</div>
      )}
    </section>
  );
};

export default HomeGameList;
