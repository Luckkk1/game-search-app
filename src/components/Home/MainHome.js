import classes from './MainHome.module.css';
import GameList from '../UI/GameList';
import MainSlide from './MainSlide';
import MainRandGame from './MainRandGame';
import Sidebar from './Sidebar';

const MainHome = () => {
  const RAWGAPIKEY = process.env.REACT_APP_RAWG_KEY;

  const gameSet = [
    {
      url: `https://api.rawg.io/api/games?key=${RAWGAPIKEY}&page=1&page_size=5&ordering=-metacritic&dates=2012-01-01,2022-12-31`,
      link: '/browse?sort=Hot Games&page=1',
      name: '인기게임',
      id: 'l1',
    },
    {
      url: `https://api.rawg.io/api/games?key=${RAWGAPIKEY}&page=1&page_size=5&ordering=-released&dates=2022-01-01,2022-12-31&metacritic=70,100`,
      link: '/browse?sort=new Gamee',
      name: '최신게임',
      id: 'l2',
    },
  ];

  const gameList = gameSet.map(game => {
    return (
      <GameList
        url={game.url}
        link={game.link}
        listName={game.name}
        key={game.id}
      />
    );
  });

  return (
    <main className={classes.main}>
      <div className={classes.slideBox}>
        <MainSlide />
        <Sidebar />
      </div>
      {gameList}
      <MainRandGame />
    </main>
  );
};

export default MainHome;
