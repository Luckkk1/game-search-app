import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import LoadingSpinner from '../../UI/LoadingSpinner';
import classes from './GameDetailDescription.module.css';

const GameDetailDescription = props => {
  // 메타스코어 점수별 색지정
  let metaColor;
  let meta = props.detail.meta;
  if (meta >= 0 && meta < 40) metaColor = '#6c757d';
  if (meta >= 40 && meta < 60) metaColor = '#a7c957';
  if (meta >= 60 && meta < 80) metaColor = '#70e000';
  if (meta >= 80 && meta < 90) metaColor = '#38b000';
  if (meta >= 90 && meta <= 100) metaColor = '#028fde';

  // 타이틀
  const title = props.detail.title ? props.detail.title : 'Not Found';

  // 장르 컨텐츠
  let genreArr;
  if (props.detail.genre) {
    genreArr = props.detail.genre.map(e => e.name);
  }
  const genre = genreArr
    ? genreArr.map(e => (
        <Link to={`/browse?sort=${e}&page=1`} key={genreArr.indexOf(e)}>
          {e}
        </Link>
      ))
    : '';

  const genreContent = (
    <Fragment>
      Genre :{' '}
      {genre && genre.length ? (
        genre
      ) : (
        <p className={classes.gray}>&nbsp; Not Found</p>
      )}
    </Fragment>
  );

  // 웹사이트 컨텐츠
  const websiteContent = (
    <Fragment>
      WebSite :
      {props.detail.website ? (
        <a href={props.detail.website} target="blank">
          &nbsp;Go to Site
        </a>
      ) : (
        <p className={classes.gray}>&nbsp; Not Found</p>
      )}
    </Fragment>
  );

  // 출시일 컨텐츠
  const releasedContent = (
    <Fragment>
      Released : &nbsp;
      <p className={classes.gray}>
        {props.detail.released ? props.detail.released : 'Not Found'}
      </p>
    </Fragment>
  );

  // 플랫폼컨첸츠
  let platformArr;
  if (props.detail.platforms) {
    platformArr = props.detail.platforms.map(e => e.platform.name);
  }
  const platformContent = (
    <Fragment>
      Platforms : &nbsp;
      <p className={classes.gray}>
        {platformArr && platformArr.length
          ? platformArr.join(', ')
          : 'NotFound'}
      </p>
    </Fragment>
  );

  // 상세설명
  let description;

  if (props.isLoading) {
    description = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (props.error) {
    description = (
      <div className="centered">
        <p>Request Failed</p>
      </div>
    );
  }

  if (!props.isLoading && !props.error) {
    description = props.detail.description;
  }

  return (
    <section className={classes.section}>
      <h2>{title}</h2>
      <div className={classes.detail}>
        <div className={classes.detailBox}>
          <span style={{ background: metaColor }}>{meta ? meta : 0}</span>
          <div className={classes.box}>{genreContent}</div>
          <div className={classes.box}>{websiteContent}</div>
          <div className={classes.box}>{releasedContent}</div>
          <div className={classes.box}>{platformContent}</div>
        </div>
      </div>
      <div className={classes.description}>{description}</div>
    </section>
  );
};

export default GameDetailDescription;
