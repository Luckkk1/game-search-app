import SwiperCore, { Navigation, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';

import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import classes from './MainSlide.module.css';

SwiperCore.use([Navigation, Autoplay, EffectFade]);

const MainSlide = () => {
  return (
    <section>
      <Swiper
        className={classes.swiper}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        // effect={'fade'}
        loop={true}
        autoplay={{ delay: 2000 }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </section>
  );
};

export default MainSlide;
