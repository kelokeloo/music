import {
  ArrowLeftOutlined,
  CustomerServiceOutlined,
  SendOutlined
} from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './index.module.scss'
import { Input,  Button } from 'antd';
const { TextArea } = Input;
import { useState, useEffect, useRef } from 'react';
import { getDialogData } from '../../../api/common/load'
import { MsgBox } from '../../../components/chat/msgBox'
import { baseUrl } from '../../../global.conf'
import moment from 'moment';


export function ChatDialog(props){
  const { socket, messagePool } = props
  const navigateTo = useNavigate()
  function goback(){
    navigateTo(-1)
  }
  // 发送的text
  const [inputValue, setInputValue] = useState('')
  function handleInputValueChange(ev){
    setInputValue(ev.target.value)
  }
  // 获取dialogID
  const { dialogId } = useParams();
  
  // 对话数据
  const [msgList, setMsgList] = useState({
    list: []
  })
  // 对话框包含用户
  let users = []

  
  // 获取对话数据
  useEffect(()=>{
    getDialogData(dialogId)
    .then(res=>{
      if(res.code === 200){
        const { usersInfo, messages} = res.data
        // 添加url
        users = usersInfo.map(item=>{
          item.headIcon = baseUrl + item.headIcon
          return item
        })
        // 让每条消息带上头像和姓名
        const list = messages.map(item=>{
          const index = users.findIndex(user=>user.userId === item.belong)
          item.headIcon = users[index].headIcon
          item.username = users[index].username
          return item
        })

        setMsgList({
          list: list
        })
        // 滚动
        scrollToBottom()
      }
    })

  }, [])
  
  // 消息滚动到底部
  function scrollToBottom() {
    const domWrapper = mainContainerRef.current; // 外层容器 出现滚动条的dom
    (function smoothscroll() {
        const currentScroll = domWrapper.scrollTop;   // 已经被卷掉的高度
        const clientHeight = domWrapper.offsetHeight; // 容器高度
        const scrollHeight = domWrapper.scrollHeight; // 内容总高度
        if (scrollHeight - 10 > currentScroll + clientHeight) {
            window.requestAnimationFrame(smoothscroll);
            domWrapper.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2);
        }
    })();
    console.log('滚动');
  }

  // 消费对话框数据
  // useEffect(()=>{
  //   let time = setInterval(()=>{
  //     //向服务器发起请求，并清空消息池
  //     const index = messagePool.pool.findIndex(item=>item.dialogId === dialogId)
      
  //     if(index === -1) return
  //     const msgs = messagePool.pool[index].msgs
  //     console.log('msgs', msgs);
  //     console.log('msgList.list', msgList.list);

  //     // 添加对话数据
  //     const copyMsgList = JSON.parse(JSON.stringify(msgList))
      
  //     copyMsgList.list = [...copyMsgList.list, ...msgs]
      
  //     setMsgList(copyMsgList)

  //     // 清空消息池
  //     messagePool.pool.splice(index, 1)
  //     // 滚动
  //     scrollToBottom()
      

  //   }, 500)
    
    
  //   return ()=>{
  //     clearInterval(time)
  //   }
  // })

  const mainContainerRef = useRef(null)





  // 发送数据
  function sendMsg(){
    const info = {
      dialogId,
      belong : window.sessionStorage.getItem('userid'),
      text : inputValue,
      musicId : "",
      time : moment().format(),
      username: window.sessionStorage.getItem('username'),
      headIcon: window.sessionStorage.getItem('headIcon')
    }
    // console.log(info);
    socket.send(JSON.stringify({
      type: 'message',
      message: info
    }))
    // 将新数据添加到list中
    const copyMsgList = JSON.parse(JSON.stringify(msgList))
    copyMsgList.list.push(info)
    setMsgList(copyMsgList)
    // 清除表单
    setInputValue('')
    // 滚动
    // 滚动
    const scrollTime = setTimeout(()=>{
      scrollToBottom()
      clearTimeout(scrollTime)
    })
  }


  return (
    <div className={classes.box}>
      <header className={classes.header}>
        <ArrowLeftOutlined className={classes.iconStyle} onClick={goback} />
      </header>
      <div className={classes.mainContainer} ref={mainContainerRef}>
        <div className={classes.main}>
          {
            msgList.list.map((item, index)=>{
              return (
                <MsgBox key={`${item.time}_${item.belong}_${index}`}
                  {...item}
                ></MsgBox>
              )
            })
          }
        </div>
      </div>
      
      <div className={classes.input}>
        <Button icon={<CustomerServiceOutlined />}></Button>
        <TextArea autoSize={{ minRows: 1, maxRows: 3 }} 
          value={inputValue}
          onChange={handleInputValueChange}
        />
        <Button icon={<SendOutlined />}
          onClick={sendMsg}
        ></Button>
      </div>
    </div>
  )
}