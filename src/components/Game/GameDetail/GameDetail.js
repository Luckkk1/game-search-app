import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useHttp from '../../../Hook/useHttp';

import classes from './GameDetail.module.css';
import GameDetailSlide from './GameDetailSlide';
import GameDetailDescription from './GameDetailDescription';
import GameList from '../../UI/GameList';
import ReplyBox from '../../UI/ReplyBox';

const GameDetail = () => {
  const params = useParams();
  const RAWGAPIKEY = process.env.REACT_APP_RAWG_KEY;
  const url = `https://api.rawg.io/api/games/${params.gameId}?key=${RAWGAPIKEY}`;
  const imgUrl = `https://api.rawg.io/api/games/${params.gameId}/screenshots?key=${RAWGAPIKEY}&page=1&page_size=5`;
  const seriesUrl = `https://api.rawg.io/api/games/${params.gameId}/game-series?key=${RAWGAPIKEY}&page=1&page_size=5`;

  const [gameData, setGameData] = useState({});
  const [gameImg, setGameImg] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  const {
    isLoading: imgLoading,
    error: imgError,
    sendRequest: imgRequest,
  } = useHttp();

  const requestConfig = useMemo(() => {
    return { url };
  }, [url]);

  const imgRequestConfig = useMemo(() => {
    return { url: imgUrl };
  }, [imgUrl]);

  useEffect(() => {
    sendRequest(requestConfig, fetchData);
    imgRequest(imgRequestConfig, fetchImg);
  }, [sendRequest, requestConfig, imgRequest, imgRequestConfig]);

  const fetchData = data => {
    setGameData({
      title: data.name,
      description: data.description_raw,
      genre: data.genres,
      platforms: data.parent_platforms,
      meta: data.metacritic,
      website: data.website,
      released: data.released,
    });
  };

  const fetchImg = data => {
    setGameImg(data.results);
  };
  return (
    <main className={classes.main}>
      <GameDetailSlide
        imgSet={gameImg}
        isLoading={imgLoading}
        error={imgError}
      />
      <GameDetailDescription
        detail={gameData}
        isLoading={isLoading}
        error={error}
      />
      <div className={classes.list}>
        <GameList url={seriesUrl} listName={'같은 시리즈'} check={'series'} />
      </div>
      <ReplyBox />
    </main>
  );
};

export default GameDetail;
