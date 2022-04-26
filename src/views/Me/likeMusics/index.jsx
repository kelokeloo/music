import classes from './index.module.scss'
import {
  ArrowLeftOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getUserInfo, getMusicById } from '../../../Api/common/load'
import { baseUrl } from '../../../global.conf';
import { MusicItem  } from '../../../components/common/musicItem'

export function LikeMusics(props){
  const { loadMusic } = props
  const userId = window.sessionStorage.getItem('userid')
  // router
  const navigateTo = useNavigate()
  function goBack(){
    navigateTo(-1)
  }
  const [likeMusics, setLikeMusics] = useState({
    list: []
  })

  useEffect(()=>{
    getUserInfo(userId)
    .then(async({userInfo})=>{
      let musicInfolistPromises = userInfo.likeMusics.map((musicId)=>{
        return getMusicById(musicId)
      })
      let musicInfolist = await Promise.all(musicInfolistPromises)
      // 解构
      musicInfolist = musicInfolist.map(item=>{
        item.data.imgUrl = baseUrl + item.data.imgUrl
        item.data.musicUrl = baseUrl + item.data.musicUrl
        return item.data
      })

      console.log('musicInfolist', musicInfolist);


      setLikeMusics({
        list: musicInfolist
      })
    })
    
  }, [])


  return (
    <div>
      <header className={classes.header}>
        <ArrowLeftOutlined className={classes.iconStyle} onClick={goBack}/>
      </header>
      <main className={classes.main} >
        {
          likeMusics.list.map((item, index)=>{
            return (
              <MusicItem
                key={item._id}
                list={likeMusics.list}
                index={index}
                loadMusic={loadMusic}
              ></MusicItem>
            )
          })
        }
      </main>
    </div>
  )
}