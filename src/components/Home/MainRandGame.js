import { Fragment, useEffect, useState } from 'react';
import useFetchList from '../../Hook/useFetchList';
import LinkBtn from '../UI/LinkBtn';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './MainRandGame.module.css';

const MainRandGame = () => {
  const [selected, setSelected] = useState([]);
  const { isLoading, error, sendRequest: fetchList } = useFetchList();

  const url =
    'https://api.rawg.io/api/games?key=b710f41f043d45349abc1a4578ef0fe5&page=1&page-size=50';

  // 메타스코어 점수별 색지정
  let metaColor;
  let meta = selected.metacritic;
  if (meta >= 0 && meta < 40) metaColor = '#6c757d';
  if (meta >= 40 && meta < 60) metaColor = '#a7c957';
  if (meta >= 60 && meta < 80) metaColor = '#70e000';
  if (meta >= 80 && meta < 90) metaColor = '#38b000';
  if (meta >= 90 && meta <= 100) metaColor = '#028fde';

  // 일반배열은 가져오지 않고 랜덤으로 선택된(랜덤) 게임만 가져옴
  useEffect(() => {
    fetchList(url, '', setSelected);
  }, [url, fetchList]);

  // 리로드 버튼 클릭시 다시 선택된(랜덤) 게임 로드
  const reloadGameHandler = () => {
    fetchList(url, '', setSelected);
  };

  const errControl = content =>
    error ? (
      <div>
        <p className="centered">{error || '에러가 발생했습니다.'}</p>
      </div>
    ) : (
      content
    );

  const leftContent = (
    <Fragment>
      {isLoading ? (
        <div className="centered">
          <LoadingSpinner />
        </div>
      ) : (
        <img src={selected.img} alt="" />
      )}
    </Fragment>
  );

  const rightContent = (
    <Fragment>
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
    </Fragment>
  );

  return (
    <section className={classes.rand}>
      <h2 className={classes.title}>오늘은 이 게임 어때?</h2>
      <div className={classes.content}>
        <div className={classes.left}>{errControl(leftContent)}</div>
        <div className={classes.right}>
          {errControl(rightContent)}
          <button onClick={reloadGameHandler}>이 게임 말고!</button>
        </div>
      </div>
    </section>
  );
};

export default MainRandGame;
