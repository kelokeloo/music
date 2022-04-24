import classes from './index.module.scss'
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper";

import { getRecentMusic, getAlbumById, albumMark } from '../../../Api/common/load'

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
      console.log('userAlbumList', data);
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
        console.log(dataArr);
        // 解构一下
        dataArr = dataArr.map(item=>{
          item.data.imgUrl = baseUrl + item.data.imgUrl
          return item.data
        })

        if(cancel) return // ...
        setDataArr({
          list: dataArr
        })
      })
      
    })
    return ()=>{
      cancel = true
    }
  }, [])

  // 处理点击
  const navigateTo = useNavigate()
  function handleAlbumClick(albumId){
    albumMark(albumId)
    navigateTo(`/album/${albumId}`)
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
        {
          dataArr.list.map(item=>{
            return (
              <SwiperSlide className={classes.swiperSlide} key={item._id}>
                <div className={classes.swiperItem} onClick={()=>handleAlbumClick(item.id)}>
                  <img src={item.imgUrl}/>
                  <p>{item.title}</p>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper> 
    </div>
  )
}