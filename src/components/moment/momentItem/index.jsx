// 有问题需要重构 

import { Skeleton, Switch, Card, Avatar, Input, Button } from 'antd';
const { TextArea } = Input
const { Meta } = Card;

import { useState } from 'react'

import classes from './index.module.scss'

import { CommentOutlined, HeartOutlined, SendOutlined} from '@ant-design/icons'

import moment from 'moment'

export function MomentCard(props){
  const {username, userID,  time, like, imgList, headIcon, content, comment} = props

  const [loading, setLoading] = useState(false)
 
  const onChange = checked => {
    setLoading(true)
  };

  const [commentList, setCommentList] = useState({
    list: comment
  })

  // 回复的目标
  const [responseTargetName, setResponseTargetName] = useState({
    name: 'default'
  })

  // 控制评论输入是否显示
  const [inputVisible, setInputVisible] = useState(false)
  
  // 处理子项点击
  function handleCommentItem(item){
    console.log('click', item);
    // 构造发布参数
    const commentInfo = {
      belongUserID: window.sessionStorage.getItem('userid'),
      belongUserName: window.sessionStorage.getItem('username'),
      toUserID: item.belongUserID,
      time: moment().format(),
      toUserName: item.belongUserName,
      content: commentData.info.content
    }
  }

  // 评论子项
  function CommentItem(props){
    const { belongUserID, belongUserName, toUserID, toUserName, content} = props

    return (
      <div onClick={()=>handleCommentItem(props)}>
        <span>{belongUserName}</span>
        <span>回复</span>
        <span>{toUserName}</span>
        <span> : </span>
         {props.content}
      </div>
    )
  }

  
  
  // 创建评论
  function CreateCommentList(props){
    let { list } = props
    list = list.map(item=>{
      return (
        <CommentItem key={item.time} {...item} ></CommentItem>
      )
    })
    return list
  }


  function Description(props) {
    let { imgList, content, comments, like } = props
    
    const [commentData, setCommentData] = useState({
      info:{
        belongUserID: '',
        belongUserName: '',
        toUserID: '',
        toUserName: '',
        content: ''
      }
    })
    


    imgList = imgList??{
      length: 0
    }
    function imgStyleSwitcher(imgNum){
      switch (imgNum) {
        case 1:
          return classes.listStyle1
        case 2: 
          return classes.listStyle2
        default:
          return classes.listStyle3
      }
    }
    // 处理textArea输入
    function handleTextAreaInput(value){
      let detail = {
        belongUserID: '',
        belongUserName: '',
        toUserID: '',
        toUserName: '',
        content: ''
      }
      detail.content = value
      console.log('detail', detail);
      setCommentData({
        info: detail
      })
    }

    // 点击评论
    function handleCommentClick(){
      setResponseTargetName({
        name: username
      })
      
      // 显示与隐藏评论输入框
      let oldState = !inputVisible
      setInputVisible(oldState)
    }

    // 发布评论
    function publish(belongUserID, belongUserName, toUserID, toUserName){
      // 填充发布参数
      const commentInfo = {
        belongUserID ,
        belongUserName ,
        toUserID,
        time: moment().format(),
        toUserName,
        content: commentData.info.content
      }

      const list = [...commentList.list, commentInfo]
      console.log('commentList', list);

      

      setCommentList({
        list: list
      })
      setInputVisible(false)
    }


    return (
      <div className={classes.description}>
        <p>{content}</p>
        <div className={imgStyleSwitcher(imgList.length)}>
          {imgList.map((item,index)=><div key={index}><img src={item}></img></div>)}
        </div>
        <div className={classes.Options}>
          <span>
            {/* 评论按钮 */}
            <CommentOutlined onClick={()=>handleCommentClick()}/>
          </span>
          <span>
            <HeartOutlined /> <span>{like}</span>
          </span>
        </div>
        <div className={classes.comment}>
          <CreateCommentList list={commentList.list}></CreateCommentList>
          {
            inputVisible ? (
              <span className={classes.comentInput}>
                <TextArea placeholder={`回复给：${responseTargetName.name}`} autoSize value={commentData.info.value} onChange={(ev)=>{handleTextAreaInput(ev.target.value)}}></TextArea>
                <Button className={classes.btn} 
                  onClick={()=>publish(
                    window.sessionStorage.getItem('userid'),
                    window.sessionStorage.getItem('username'),
                    userID,
                    username
                  )}
                ><SendOutlined /></Button>
              </span>
            ) : ''
          }
        </div>
      </div>
    )
  }

  return (
    <div>
      <Card style={{ marginTop: 16 }} loading={loading}>
        <Meta
          avatar={<Avatar src={headIcon} />}
          title={username}
          description={<Description imgList={imgList} content={content} like={like} comments={commentList.list}></Description>}
        />
      </Card>
    </div>
  )
}