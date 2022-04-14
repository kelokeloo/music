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
      <App socket={socket}/>
    </BrowserRouter>
  // </React.StrictMode>,
  , document.getElementById('root')
)
