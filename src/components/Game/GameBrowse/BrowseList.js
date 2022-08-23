import { Link, useLocation } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';

import GameList from '../../UI/GameList';
import { GameGenre } from './GameGenre';
import classes from './BrowseList.module.css';

const BrowseList = props => {
  const [showGenre, setShowGenre] = useState(false);
  const location = useLocation();

  const RAWGAPIKEY = process.env.REACT_APP_RAWG_KEY;
  const QueryParams = new URLSearchParams(location.search);
  const pageNum = QueryParams.get('page');
  const sortMethod = props.sort.replace(' ', '');

  // 인기,최신 게임 set
  let urlSet = {
    HotGames: `https://api.rawg.io/api/games?key=${RAWGAPIKEY}&page=${pageNum}&page_size=15&ordering=-metacritic&dates=2012-01-01,2022-12-31`,
    NewGames: `https://api.rawg.io/api/games?key=${RAWGAPIKEY}&page=${pageNum}&page_size=15&ordering=-released&dates=2022-01-01,2022-12-31&metacritic=70,100`,
  };

  let url = urlSet[sortMethod];

  // genreSet
  if (GameGenre.includes(sortMethod)) {
    url = `https://api.rawg.io/api/games?key=${RAWGAPIKEY}&page=${pageNum}&page_size=15&ordering=-metacritic&dates=2012-01-01,2022-12-31&genres=${sortMethod.toLowerCase()}`;
  }
  let pageContent;

  // 현재페이지 넘버 볼드화
  const boldNum = n => {
    return +pageNum === +n ? <b style={{ color: 'white' }}>{n}</b> : n;
  };

  // 1~3 넘버링 Set
  if (pageNum < 4) {
    pageContent = (
      <Fragment>
        <Link to={`?sort=${props.sort}&page=1`}>{boldNum(1)}</Link>
        <Link to={`?sort=${props.sort}&page=2`}>{boldNum(2)}</Link>
        <Link to={`?sort=${props.sort}&page=3`}>{boldNum(3)}</Link>
        <Link to={`?sort=${props.sort}&page=4`}>{boldNum(4)}</Link>
        <p>...</p>
        <Link to={`?sort=${props.sort}&page=10`}>10</Link>
      </Fragment>
    );
  }

  // 4~7 넘버링 Set
  if (pageNum >= 4 && pageNum < 8) {
    pageContent = (
      <Fragment>
        <Link to={`?sort=${props.sort}&page=1`}>1</Link>
        <p>...</p>
        <Link to={`?sort=${props.sort}&page=${+pageNum - 1}`}>
          {+pageNum - 1}
        </Link>
        <Link to={`?sort=${props.sort}&page=${+pageNum}`}>
          {boldNum(+pageNum)}
        </Link>
        <Link to={`?sort=${props.sort}&page=${+pageNum + 1}`}>
          {+pageNum + 1}
        </Link>
        <p>...</p>
        <Link to={`?sort=${props.sort}&page=10`}>10</Link>
      </Fragment>
    );
  }

  // 8~10 넘버링 Set
  if (pageNum >= 8) {
    pageContent = (
      <Fragment>
        <Link to={`?sort=${props.sort}&page=1`}>1</Link>
        <p>...</p>
        <Link to={`?sort=${props.sort}&page=7`}>{boldNum(7)}</Link>
        <Link to={`?sort=${props.sort}&page=8`}>{boldNum(8)}</Link>
        <Link to={`?sort=${props.sort}&page=9`}>{boldNum(9)}</Link>
        <Link to={`?sort=${props.sort}&page=10`}>{boldNum(10)}</Link>
      </Fragment>
    );
  }

  // 드롭다운
  const showGenreHandler = () => {
    setShowGenre(prev => !prev);
  };

  // 드롭다운 선택시 드롭다운 클로즈
  const linkCloseHandler = () => {
    setShowGenre(prev => !prev);
  };

  // 드롭다운 엘리먼트
  const genres = GameGenre.map(g => (
    <Link
      to={`/browse?sort=${g}&page=1`}
      key={g}
      className={classes.dropEle}
      onClick={linkCloseHandler}
    >
      {g}
    </Link>
  ));

  return (
    <section className={classes.section}>
      <div className={classes.sort}>
        <Link to={'/browse?sort=Hot Games&page=1'} className={classes.link}>
          Hot Games
        </Link>
        <Link to={'/browse?sort=New Games&page=1'} className={classes.link}>
          New Games
        </Link>
        <div className={classes.dropDown}>
          <button onClick={showGenreHandler}>Genres</button>
          {showGenre ? <div className={classes.drop}>{genres}</div> : ''}
        </div>
      </div>
      <div className={classes.list}>
        <GameList url={url} />
      </div>
      <div className={classes.pageNum}>{pageContent}</div>
    </section>
  );
};

export default BrowseList;
