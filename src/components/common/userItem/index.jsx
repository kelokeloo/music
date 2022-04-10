import { List, Avatar } from 'antd';

import { setFocusUser } from '../../../Api/common/load'

import { useNavigate } from 'react-router';
import classes from './index.module.scss'
import { useState } from 'react'

import {
  WechatOutlined,
  PlusCircleOutlined
}from '@ant-design/icons'

export function UserItem(props){
  const { headIcon, username, _id, focusInitState} = props

  const navigateTo = useNavigate()
  function handleClick(){
    navigateTo(`/user/${_id}`)
  }
  const [focus, setFocus] = useState(focusInitState)

  function handleFocusClick(){
    let state = !focus;
    // 向服务器发送请求
    setFocusUser(_id, state)
    .then(data=>{
      console.log(data);
    })
    setFocus(state)
  }

  return (
    <div className={classes.box}>
      <Avatar src={headIcon}></Avatar>
      <div className={classes.content}>
        <span>{username}</span>
      </div>
      <div className={classes.options}>
        <WechatOutlined className={classes.iconStyle}/>
        <span onClick={handleFocusClick}>
        {
          !focus ? <span className={classes.focus}>关注</span> : <span className={classes.defocus}>已关注</span>
        }
        </span>
      </div>
    </div>
  )
}