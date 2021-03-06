import classes from './index.module.scss'
import { useState, useEffect, useContext } from 'react';

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

// mark & ...
import { getMusicById, albumMark } from '../../../Api/common/load'

// react router 
import { useNavigate } from 'react-router';




export function Like(props){
  const { loadMusic } = props
  const navigateTo = useNavigate()

  const [data, setData] = useState({
    list: [{title: 'go'}]
  })

  useEffect(()=>{
    let cancel = false
    getHandpick()
    .then((res)=>{
      if(cancel) return
      res.data.forEach(item=>{
        item.imgUrl = baseUrl + item.imgUrl
      })
      console.log(res);
      setData({list: res.data})
    })
    return ()=>{
      cancel = true
    }
  }, [])

  
  // card
  function CreateSwiperSlides(list){
    if(!list){
      return 
      <SwiperSlide className={classes.swiperSlide}>
        <div>
          defalult
        </div>
      </SwiperSlide>
    }
    async function handleSwiperSliderClick(type){
      switch (type.name) {
        case 'music': // 加载音乐
          const { data } = await getMusicById(type.id)
          // 标记音乐
          // musicMark(type.id)
          let musicUrl = baseUrl + data.musicUrl
          let imgUrl = baseUrl + data.imgUrl
          data.musicUrl = musicUrl
          data.imgUrl = imgUrl
          // 封装成一个list
          const list = [data]
          console.log('musicItem', data);
          loadMusic(list, 0)
          break;
        case 'album': // 跳转到指定歌单
          // 标记歌单
          console.log('type', type);
          albumMark(type.id)
          console.log('----', type.id);
          navigateTo(`/album/${type.id}`)
          break;
      
        default:
          break;
      }
    }


    return list.map((item, index)=>{
      return (
        <SwiperSlide className={classes.swiperSlide} key={index}
          onClick={()=>{handleSwiperSliderClick(item.type)}}
        >
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