import {
  ArrowLeftOutlined,
  CustomerServiceOutlined,
  SendOutlined
} from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './index.module.scss'
import { Input,  Button } from 'antd';
const { TextArea } = Input;
import { useState, useEffect } from 'react';
import { getDialogData } from '../../../api/common/load'
import { MsgBox } from '../../../components/chat/msgBox'
import { baseUrl } from '../../../global.conf'
import moment from 'moment';


export function ChatDialog(props){
  const { socket } = props
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
        console.log('usersInfo', usersInfo);
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
        console.log('users', users);
        console.log('msgs', list)
      }
    })
  }, [])

  // 发送数据
  function sendMsg(){
    const info = {
      dialogId,
      belong : window.sessionStorage.getItem('userid'),
      text : inputValue,
      musicId : "",
      time : moment().format()
    }
    console.log(info);
  }


  return (
    <div className={classes.box}>
      <header className={classes.header}>
        <ArrowLeftOutlined className={classes.iconStyle} onClick={goback} />
      </header>
      <div className={classes.mainContainer}>
        <div className={classes.main}>
          {
            msgList.list.map(item=>{
              return (
                <MsgBox key={`${item.time}_${item.belong}`}
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