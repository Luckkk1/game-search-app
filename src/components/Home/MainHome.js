import classes from './MainHome.module.css';
import HomeGameList from '../UI/HomeGameList';
import MainSlide from './MainSlide';
import MainRandGame from './MainRandGame';
import Sidebar from './Sidebar';

const MainHome = () => {
  const gameSet = [
    {
      url: 'https://api.rawg.io/api/games?key=b710f41f043d45349abc1a4578ef0fe5&page=1&page_size=5&ordering=-metacritic&dates=2012-01-01,2022-12-31',
      link: '/list?order=hot',
      name: '인기게임',
    },
    {
      url: 'https://api.rawg.io/api/games?key=b710f41f043d45349abc1a4578ef0fe5&page=1&page_size=5&ordering=-released&dates=2022-01-01,2022-12-31&metacritic=70,100',
      link: 'list?order=latest',
      name: '최신게임',
    },
  ];

  const gameList = gameSet.map(game => {
    return (
      <HomeGameList url={game.url} link={game.link} listName={game.name} />
    );
  });

  return (
    <main>
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
