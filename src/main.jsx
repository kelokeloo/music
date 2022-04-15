import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

// antDesign CSS
import 'antd/dist/antd.css';

// router
import { BrowserRouter } from "react-router-dom";

// webSocket
/**
 * 先创建一个socket连接，登录成功之后再发送具体的ID来绑定连接
 */
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');


// 消息池
const messagePool = {
  pool: [
    // {
    //   dialogId, 
    //   msgs: []
    // }
  ]
}


// Listen for messages
socket.addEventListener('message', function (event) {
  const info = JSON.parse(event.data)
  console.log('Message from server ', info);
  const {type, message} = info
  const { belong, dialogId, isRead, musicId, text, time, username, headIcon} = message
  
  console.log(message);

  switch (type) {
    case 'dialog':
      // 将消息加入消息池
      const index = messagePool.pool.findIndex(item=>item.dialogId === dialogId)  
      const msg = { belong, isRead, musicId, text, time, username, headIcon }
      if(index >= 0){// 对话框已经存在
        messagePool.pool[index].msgs.push(msg)
      }
      else {
        messagePool.pool.push({
          dialogId,
          msgs: [msg]
        })
      }
      break;
  
    default:
      break;
  }
  // 将数据添加到消息池中

});

// setInterval(()=>{
//   console.log('messagePool', messagePool);
// }, 3000)




// 如果有这个值，立马绑定，解决浏览器刷新问题
if(window.sessionStorage.getItem('userid')){
  socket.addEventListener('open', ()=>{
    socket.send(JSON.stringify({
      type: 'connect',
      userId: window.sessionStorage.getItem('userid')
    }))
  })
}





ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <App socket={socket} messagePool={messagePool}/>
    </BrowserRouter>
  // </React.StrictMode>,
  , document.getElementById('root')
)
