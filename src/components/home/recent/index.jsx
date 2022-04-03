import classes from './index.module.scss'
import React, { useRef, useState } from 'react';


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { FreeMode } from "swiper";


export function Recent(props) {
  return (
    <div className={classes.recent}>
      <h2>最近播放</h2>
      <Swiper
        slidesPerView={2.15}
        spaceBetween={10}
        freeMode={true}
        // pagination={{
        //   clickable: true
        // }}
        modules={[FreeMode]}
        className={classes.swiper}
      >
        <SwiperSlide className={classes.swiperSlide}>
          <div className={classes.swiperItem}>xxx</div>
        </SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>
        <div className={classes.swiperItem}>xxx</div>
          </SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>
          <div className={classes.swiperItem}>xxx</div>
        </SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>
          <div className={classes.swiperItem}>xxx</div>
        </SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>
          <div className={classes.swiperItem}>xxx</div>
        </SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>
          <div className={classes.swiperItem}>xxx</div>
        </SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>
          <div className={classes.swiperItem}>xxx</div>
        </SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>
          <div className={classes.swiperItem}>xxx</div>
        </SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>
          <div className={classes.swiperItem}>xxx</div>
        </SwiperSlide>
      </Swiper> 
    </div>
  )
}