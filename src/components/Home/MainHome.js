import classes from './MainHome.module.css';
import HomeGameList from '../UI/HomeGameList';
import MainSlide from './MainSlide';

const MainHome = () => {
  let hotGameUrl =
    'https://api.rawg.io/api/games?key=b710f41f043d45349abc1a4578ef0fe5&page=1&page_size=5&ordering=-metacritic&dates=2012-01-01,2022-12-31';

  let newGameUrl =
    'https://api.rawg.io/api/games?key=b710f41f043d45349abc1a4578ef0fe5&page=1&page_size=5&ordering=-released&dates=2022-01-01,2022-12-31&metacritic=70,100';

  return (
    <main>
      <MainSlide />
      <HomeGameList
        url={hotGameUrl}
        link={'/list?order=hot'}
        listName="인기게임"
      />
      <HomeGameList
        url={newGameUrl}
        link={'/list?order=latest'}
        listName="최신게임"
      />
    </main>
  );
};

export default MainHome;
