import classes from './index.module.scss'
import { useRef, useState, useEffect } from 'react';


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper";

import { getRecentMusic, getAlbumById } from '../../../Api/common/load'

import { baseUrl } from '../../../global.conf'



export function Recent(props) {
  const [dataArr, setDataArr] = useState({
    list: []
  })
  
  useEffect(()=>{
    let cancel = false // 防止销毁的时候继续执行
    getRecentMusic()
    .then(data=>{

      if(cancel) return
      // 拼接成数组请求数据
      console.log(data);
      let recentMusics = data.data?.recentMusicAlbum
      let userAlbumList = data.data?.albumList ?? []
      // 如果最近喜欢的音乐列表在歌单中则去除
      const index = userAlbumList.findIndex(item=>item===recentMusics)
      if(index !== -1){
        userAlbumList.splice(index, 1)
      }

      if(recentMusics)
        userAlbumList.unshift(recentMusics)

      if(!userAlbumList.length) return

      // 请求数据
      const promises = userAlbumList.map(albumId=>{
        return getAlbumById(albumId)
      })
      Promise.all(promises)
      .then(dataArr=>{
        // dataArr 就是歌单数据列表, 根据这个列表获取歌单数据
        
        // 解构一下
        dataArr = dataArr.map(item=>{
          item.data.imgUrl = baseUrl + item.data.imgUrl
          return item.data
        })

        if(cancel) return // ...
        console.log('dataArr', dataArr);
        setDataArr({
          list: dataArr
        })
      })
      
    })
    return ()=>{
      cancel = true
    }
  }, [])

  function CreateSwiperSlide(props){
    const { list } = props

    const res = list.map(item=>{
      return (
        <SwiperSlide key={item._id} className={classes.swiperSlide}>
          <div className={classes.swiperItem}>
              xxx
          </div>
        </SwiperSlide>
      )
    })
    // list.map((item)=>{
    //   return (
    //     <SwiperSlide key={item._id} className={classes.swiperSlide}>
    //       <div className={classes.swiperItem}>
    //         {item.title}
    //       </div>
    //     </SwiperSlide>
    //   )
    // })
    return res
  }

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
        {<CreateSwiperSlide list={dataArr.list}></CreateSwiperSlide>}
      </Swiper> 
    </div>
  )
}