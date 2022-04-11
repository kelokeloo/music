import classes from './index.module.scss'
import { Avatar, Input, Button } from 'antd';
const { TextArea } = Input
import { HeartOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons';
import { useState } from 'react'
import moment from 'moment';
import { addComment } from '../../../Api/common/load'

export function MomentCard(props){
  const { username, userID , time,like,imgList,headIcon,content,comment } = props

  function CreateImgs(props){
    const { list } = props
    return list.map(item=>{
      return (
        <div key={item} className={classes.imgBox}>
          <img src={item}/>
        </div>
      )
    })
  }
  // 评论列表数据
  const [comments, setComments] = useState({
    list: comment
  })

  

  // 控制输入是否显示
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [placeholder, setPlaceholder] = useState('default')
  const [commentInfo, setCommentInfo] = useState({
    belongUserID: "",
    belongUserName: "",
    toUserID: "",
    toUserName: ""
  })

  // input 双向绑定
  function inputChange(ev){
    setInputValue(ev.target.value)
  }

  // 点击评论图标
  function handleCommentIconClick(){
    const state = !inputVisible
    setInputVisible(state)
    // 设置提示值
    setPlaceholder(`回复 ${username}`)
    // 设置评论相关信息
    const info = {
      belongUserID: window.sessionStorage.getItem('userid'),
      belongUserName: window.sessionStorage.getItem('username'),
      toUserID: userID,
      toUserName: username
    }
    setCommentInfo(info)
  }
  // 点击评论项
  function handleCommentItemClick(username, userID){
    setInputVisible(true)
    // 设置提示值
    setPlaceholder(`回复 ${username}`)
    // 设置评论相关信息
    const info = {
      belongUserID: window.sessionStorage.getItem('userid'),
      belongUserName: window.sessionStorage.getItem('username'),
      toUserID: userID,
      toUserName: username
    }
    setCommentInfo(info)
  }

  // 发布评论
  function doComment(){
    // 评论格式数据
    const info = {
      belongUserID: commentInfo.belongUserID,
      belongUserName: commentInfo.belongUserName,
      content: inputValue,
      time: moment().format(),
      toUserID: commentInfo.toUserID,
      toUserName: commentInfo.toUserName
    }
    // 同步本地
    const list = [...comments.list, info]
    setComments({list})
    setInputVisible(false)
    // 清除数据
    setInputValue('')
    // 同步远程 
    const commentData = {
      userID,
      time,
      info
    }
    addComment(commentData)
    .then(data=>{
      console.log('提交', commentData);
    })
  }


  // 渲染评论，只做渲染, 组件内部不保存状态
  function CreateComments(props){
    const { list } = props
    console.log(list);
    return list.map((item, index)=>{
      const { belongUserName, belongUserID, toUserName, time, content} = item
      return (
        <div key={index} onClick={()=>handleCommentItemClick(belongUserName, belongUserID)}>
          <span>{belongUserName}</span>
          <span> 回复 </span>
          <span>{toUserName} : </span>
          <span>{content}</span>
        </div>
      )
    })
  }

  return (
    <div className={classes.box}>
      <header className={classes.header}>
        <Avatar src={headIcon}></Avatar>
        <h3>{username}</h3>
      </header>
      <div className={classes.content}>
        <div>{content}</div>
        <div className={classes.imgList}>
          <CreateImgs list={imgList}></CreateImgs>
        </div>
        <div className={classes.options}>
          <MessageOutlined onClick={handleCommentIconClick}/>
          <HeartOutlined /> <span>{like}</span>
        </div>
        <div className={classes.comments}>
          <CreateComments list={comments.list}></CreateComments>
        </div>
        {
          inputVisible?(
            <div className={classes.commentInput}>
              <TextArea autoSize 
                value={inputValue} onChange={inputChange}
                placeholder={placeholder}
              ></TextArea>
              <Button icon={<SendOutlined />}
                onClick={doComment}
              ></Button>
            </div>
          ): ''
        }
      </div>
    </div>
  )
}