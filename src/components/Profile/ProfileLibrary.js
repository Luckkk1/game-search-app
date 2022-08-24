import { useState, useEffect } from 'react';
import useHttp from '../../Hook/useHttp';

import GameCard from '../UI/GameCard';
import classes from './ProfileLibrary.module.css';

const ProfileLibrary = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [game, setGame] = useState([]);

  useEffect(() => {
    sendRequest(
      {
        url: `https://gamesearch-3e27f-default-rtdb.firebaseio.com/users/${localStorage.getItem(
          'key'
        )}/library.json`,
      },
      getGame
    );
  }, []);

  const getGame = data => {
    const arr = [];
    for (let id in data) {
      arr.push(...Object.values(data[id]));
    }
    setGame(arr);
  };

  let gameList = game.map(game => (
    <GameCard
      name={game.name}
      url={game.url}
      key={game.id}
      metacritic={game.meta}
      id={game.id}
    />
  ));

  return (
    <section className={classes.librarySection}>
      <h2>Library</h2>
      {gameList}
    </section>
  );
};

export default ProfileLibrary;
