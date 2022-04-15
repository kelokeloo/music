import classes from './index.module.scss'

import { Avatar, Card  } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react'

import { TokenTest } from '../../../components/common/tokenTest'
import { getUserInfo } from '../../../Api/common/load'

export function Me(){
  const userId = window.sessionStorage.getItem('userid')
  const name = window.sessionStorage.getItem('username')
  const headIcon = window.sessionStorage.getItem('headIcon')
  const attention = 36
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

  useEffect(()=>{
    getUserInfo(userId)
    .then(({userInfo})=>{
      setFocus(userInfo.userFocusList.length)
    })
  }, [])



  return (
    <div className={classes.box}>
      <div className={classes.info}>
        <Avatar size={64} icon={<UserOutlined />} src={headIcon}></Avatar>
        <div className={classes.name}><h1>{name}</h1></div>
        <div className={classes.data}>
          <span>{attention} 关注</span>
          <span>{fans} 粉丝</span>
          <span>{like} 喜欢</span>
        </div>
      </div>
      <div className={classes.likeMusic}>
        <Card title={<Title label="喜欢的音乐"></Title>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
      <div className={classes.likeAlbum}>
      <Card title={<Title label="喜欢的专辑"></Title>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
      <div className={classes.moment}>
        动态
      </div>
      <TokenTest></TokenTest>
    </div>
  )
}