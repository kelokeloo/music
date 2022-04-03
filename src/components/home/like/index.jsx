import classes from './index.module.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

export function Like(props){
  return (
    <div>
      <div className={classes.like}>
        <h2>精选推荐</h2>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className={classes.swiper}
        >
          <SwiperSlide className={classes.swiperSlide}>
            <div>
              xxx
            </div>
          </SwiperSlide>
          <SwiperSlide className={classes.swiperSlide}>Slide 2</SwiperSlide>
          <SwiperSlide className={classes.swiperSlide}>Slide 3</SwiperSlide>
          <SwiperSlide className={classes.swiperSlide}>Slide 4</SwiperSlide>
          <SwiperSlide className={classes.swiperSlide}>Slide 5</SwiperSlide>
          <SwiperSlide className={classes.swiperSlide}>Slide 6</SwiperSlide>
          <SwiperSlide className={classes.swiperSlide}>Slide 7</SwiperSlide>
          <SwiperSlide className={classes.swiperSlide}>Slide 8</SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}