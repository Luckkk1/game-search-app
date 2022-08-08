import SwiperCore, { Navigation, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchList from '../../Hook/useFetchList';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import classes from './MainSlide.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

SwiperCore.use([Navigation, Autoplay, EffectFade]);

const MainSlide = () => {
  const { isLoading, error, sendRequest: fetchList } = useFetchList();
  const [gameList, setGameList] = useState([]);
  const url =
    'https://api.rawg.io/api/games?key=b710f41f043d45349abc1a4578ef0fe5&page=1&page_size=3&ordering=-rating&dates=2022-01-01,2022-12-31&metacritic=80,100';

  useEffect(() => {
    fetchList(url, setGameList);
  }, [url, fetchList]);

  // 개별슬라이드 요소
  const slide = gameList.map(game => {
    const ratingScroe = `${game.rating * 2}%`;
    const link = `/app/${game.id}`;
    return (
      <SwiperSlide key={game.id}>
        <h3 className={classes.name}>{game.name}</h3>
        <div className={classes.rating}>
          <div className={classes.ratingUpper} style={{ width: ratingScroe }}>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <div className={classes.ratingLower}>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
        <p className={classes.score}>{game.rating}</p>
        <img src={game.img} alt="" />
        <div className={classes.shadow}></div>
        <Link className={classes.slideButton} to={link}>
          자세히 보기
        </Link>
      </SwiperSlide>
    );
  });

  // 레이아웃
  return (
    <section>
      {isLoading ? (
        <LoadingSpinner className="centered" />
      ) : (
        <Swiper
          className={classes.swiper}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          effect={'fade'}
          loop={true}
          autoplay={{ delay: 5000 }}
        >
          <div className={classes.cont}>{slide}</div>
        </Swiper>
      )}
    </section>
  );
};

export default MainSlide;
