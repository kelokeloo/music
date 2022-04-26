import classes from './index.module.scss'

import { Avatar, Card, Button  } from 'antd';
import { UserOutlined,SettingOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react'

import { TokenTest } from '../../../components/common/tokenTest'
import { getUserInfo, getMusicById } from '../../../Api/common/load'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../global.conf';
import { MusicItem  } from '../../../components/common/musicItem'

export function Me(props){
  const { setLogin, loadMusic } = props
  const userId = window.sessionStorage.getItem('userid')
  const name = window.sessionStorage.getItem('username')
  const headIcon = window.sessionStorage.getItem('headIcon')
  const fans = 99
  const like = 120

  function Title(props){
    const { label } = props
    return (
      <h3 className={classes.cardTitle}>{label}</h3>
    )
  }
  
  // 
  const [focus, setFocus] = useState(0)
  const [likeMusics, setLikeMusics] = useState({
    list: []
  })

  useEffect(()=>{
    getUserInfo(userId)
    .then(async({userInfo})=>{
      setFocus(userInfo.userFocusList.length)
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
      if(musicInfolist.length > 5){
        musicInfolist.splice(5)
      }

      setLikeMusics({
        list: musicInfolist
      })
    })
    
  }, [])

  useEffect(()=>{
    console.log('likeMusics', likeMusics.list);
  }, [likeMusics])


  const navigateTo = useNavigate()
  function logout(){
    setLogin(false)
    window.sessionStorage.clear()
    navigateTo('/login')
  }

  function handleMoreClick(){
    navigateTo('/me/LikeMusics')
  }

  return (
    <div className={classes.box}>
      <div className={classes.info}>
        <Avatar size={64} icon={<UserOutlined />} src={headIcon}></Avatar>
        <div className={classes.name}><h1>{name}</h1></div>
        <div className={classes.data}>
          <span>{focus} 关注</span>
        </div>
      </div>
      <div className={classes.likeMusic}>
        
        <Card title={<Title label="喜欢的音乐"></Title>} extra={<div onClick={()=>handleMoreClick()}>更多</div>}>
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
        </Card>
      </div>
      <div className={classes.setting}>
        <h3>
          <SettingOutlined />
          <span>设置</span>
        </h3>
        <main>
          <p onClick={()=>navigateTo('/me/setPassword')}>修改账号密码</p>
          <p onClick={()=>navigateTo('/me/setHeadIcon')}>修改头像</p>
        </main>
      </div>
      <div>
        <Button onClick={logout}>注销</Button>
      </div>
      <TokenTest></TokenTest>
    </div>
  )
}