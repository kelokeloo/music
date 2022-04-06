import classes from './index.module.scss'
import { useState, useEffect } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

// homeApi
import { getHandpick } from '../../../Api/home'

// conf

import { baseUrl } from '../../../global.conf';

export function Like(props){
  const [data, setData] = useState({
    list: [{title: 'go'}]
  })

  useEffect(()=>{
    getHandpick()
    .then((res)=>{
      console.log(res.data);
      res.data.forEach(item=>{
        item.imgUrl = baseUrl + item.imgUrl
      })
      setData({list: res.data})
    })
  }, [])

  
  // card
  function CreateSwiperSlides(list){
    console.log('list', list);
    if(!list){
      return 
      <SwiperSlide className={classes.swiperSlide}>
        <div>
          defalult
        </div>
      </SwiperSlide>
    }
    function handleSwiperSliderClick(type){
      switch (type) {
        case 'music': // 加载音乐
          
          break;
        case 'album': // 跳转到指定歌单

          break;
      
        default:
          break;
      }
    }


    return list.map((item, index)=>{
      return (
        <SwiperSlide className={classes.swiperSlide} key={index}>
          <div className={classes.card}>
            <div className={classes.cardImg}>
              <img src={item.imgUrl}/>
            </div>
            <div className={classes.bg} 
              style={{
                background: `transparent url(${item.imgUrl}) center center no-repeat`,
              }}
            ></div>
            <div className={classes.info}
            >
              <h3>{item.title}</h3>
              {item.content ? <p>{item.content}</p> : ''}
            </div>
          </div>
        </SwiperSlide>
      )
    })
  }


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
          {
            CreateSwiperSlides(data.list) 
          }
          
        </Swiper>
      </div>
    </div>
  )
}