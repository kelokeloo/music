// RCE CSS
import "react-chat-elements/dist/main.css";
// MessageBox component
// import { MessageBox } from "react-chat-elements";
// import { ChatItem, SideBar, Popup } from "react-chat-elements";

import { TokenTest } from '../../../components/common/tokenTest'
import { 
  PlusCircleOutlined 
}from '@ant-design/icons'
import classes from './index.module.scss'
import { getChatList, getUserInfo } from '../../../Api/common/load'
import { ChatItem } from '../../../components/chat/chatItem'
import { useEffect, useState } from "react";
import { baseUrl } from '../../../global.conf'
import moment from "moment";

export function Chat(props){
  const { messagePool } = props
  // 对话列表数据
  const [chatList, setChatList] = useState({
    list: []
  })
  // 获取对话列表
  useEffect(()=>{
    getChatList()
    .then(({chatList:chatListRaw})=>{
      // 获取对话框相关数据
      let chatRelateInfo = chatListRaw.map((item)=>{
        const {include, messages, _id} = item
        // 获取最近一条消息的时间和内容
        const length = messages.length
        let time = ''
        let content = ''
        if(length !== 0){
          const lastInfo = messages[length-1]
          const { content: contentRaw, timeStamp } = lastInfo
          time = moment(timeStamp).fromNow();   
          switch (contentRaw.type) {
            case 'text':
              content = contentRaw.value
              break;
          
            default:
              break;
          }
        }

        // 获取头像和姓名
        const userId = window.sessionStorage.getItem('userid')
        const index = include.findIndex(item=>item===userId)
        if(include.length>2){
          // 说明是群组，另外处理，现在不需要
        }
        const targetUserId = index === 0 ? include[1] : include[0];
        // 获取targetUserId的头像，以及用户信息
        return getUserInfo(targetUserId)
        .then(res=>{
          return {
            username: res.userInfo.username,
            headIcon: baseUrl + res.userInfo.headIcon,
            time,
            content,
            _id
          }
        })
      })
      return Promise.all(chatRelateInfo)
      // 处理对话列表数据
    })
    .then(list=>{
      // 拿到并处理好相关数据,设置状态
      setChatList({
        list: list
      })
    })
  }, [])


  
  return (
    <div className={classes.box}>
      <header className={classes.header}>
        <PlusCircleOutlined className={classes.iconStyle}/>
      </header>
      <div className={classes.main}>
        {
          chatList.list.map((item)=>{
            return (
              <div key={item._id} className={classes.msgBox}>
                <ChatItem {...item}></ChatItem>
                {item.hasNewMsg ? <div className={classes.notify}></div>:<div></div>}
              </div>
            )
          })
        }
      </div>
      <TokenTest></TokenTest>
    </div>
  )
}