import SwiperCore, { Navigation, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import classes from './GameDetailSlide.module.css';
import LoadingSpinner from '../../UI/LoadingSpinner';

SwiperCore.use([Navigation, EffectFade]);

const GameDetailSlide = props => {
  const imgSet = props.imgSet;
  const slide = imgSet
    ? imgSet.map(data => {
        return (
          <SwiperSlide key={imgSet.indexOf(data)}>
            <img src={data.image} alt="" />
          </SwiperSlide>
        );
      })
    : '';

  const slideSection = (
    <Swiper
      className={classes.swiper}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      effect={'fade'}
      loop={true}
    >
      <div className={classes.cont}>{slide}</div>
    </Swiper>
  );

  let content;

  if (props.isLoading) {
    content = (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (props.error) {
    content = (
      <div>
        <p className={classes.error}>Request Failed</p>
      </div>
    );
  }

  if (!props.isLoading && !props.error) {
    content = slideSection;
  }

  return (
    <section className={classes.section}>
      <div className={classes.slideBox}>{content}</div>
    </section>
  );
};

export default GameDetailSlide;
