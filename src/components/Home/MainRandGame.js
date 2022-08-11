import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchList from '../../Hook/useFetchList';
import LinkBtn from '../UI/LinkBtn';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './MainRandGame.module.css';

const MainRandGame = () => {
  const [selected, setSelected] = useState([]);
  const { isLoading, error, sendRequest: fetchList } = useFetchList();
  const url =
    'https://api.rawg.io/api/games?key=b710f41f043d45349abc1a4578ef0fe5&page=1&page-size=50';
  useEffect(() => {
    fetchList(url, '', setSelected);
  }, [url, fetchList]);

  let metaColor;
  let meta = selected.metacritic;
  if (meta >= 0 && meta < 40) metaColor = '#6c757d';
  if (meta >= 40 && meta < 60) metaColor = '#a7c957';
  if (meta >= 60 && meta < 80) metaColor = '#70e000';
  if (meta >= 80 && meta < 90) metaColor = '#38b000';
  if (meta >= 90 && meta <= 100) metaColor = '#028fde';

  const reloadGameHandler = () => {
    fetchList(url, '', setSelected);
  };

  return (
    <section className={classes.rand}>
      <h2 className={classes.title}>오늘은 이 게임 어때?</h2>
      <div className={classes.content}>
        <div className={classes.left}>
          {isLoading ? (
            <div className="centered">
              <LoadingSpinner />
            </div>
          ) : (
            <img src={selected.img} alt="" />
          )}
        </div>
        <div className={classes.right}>
          {isLoading ? (
            <div className="centered">
              <LoadingSpinner />
            </div>
          ) : (
            <Fragment>
              <h3>{selected.name}</h3>
              <div className={classes.description}>
                <div className={classes.meta}>
                  이 게임은 유저로부터{' '}
                  <b style={{ color: metaColor }}>{selected.metacritic}%</b>의
                  평가를 받고 있어요.
                </div>
              </div>
              <LinkBtn to={`/app/${selected.id}`} className={classes.link}>
                자세히 보기
              </LinkBtn>
            </Fragment>
          )}

          <button onClick={reloadGameHandler}>이 게임 말고!</button>
        </div>
      </div>
    </section>
  );
};

export default MainRandGame;
