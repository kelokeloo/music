import { useState, useRef, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

// views
import { Home } from './views/Home/home'
import { Moment } from './views/Moment/moment'
import { Chat } from './views/Chat/chat'
import { Me } from './views/Me/me';
import { Search } from './views/Search/search';
import { AddMoment } from './views/Moment/addMoment';
import { MomentDetail } from './views/Moment/momentDetail'
import { Album } from './views/Album/album'
import { Login } from './views/Login/login'
import { Forget } from './views/Login/forget'
import { CreateAccount } from './views/Login/createAccount'
import { ChatDialog } from './views/Chat/chatDialog'
import { Test } from './views/test'
import { SetPassword } from './views/Me/setPassword'
import { SetHeadIcon } from './views/Me/setHeadIcon';

// footerNav
import { Nav } from './components/nav'
// playerMini
import { PlayerMini } from './components/playerMini';
// player
import { Player } from './components/player'

// style
import classes from './App.module.scss'

// router
import { useLocation  } from 'react-router-dom'
import { getRange } from './Api/home';
import { baseUrl } from './global.conf';

import { message } from 'antd';
import { setUserLikeMusic, getAllDialogUnreadMsg } from './Api/common/load'
import { musicMark } from './Api/common/load'






function App(props) { 
  

  // 页面刷新的时候处理导航
  const location = useLocation();
  let activeIndex = -1
  switch (location.pathname) {
    case '/search':
    case '/':
      activeIndex = 0
      break;
    case '/chat':
      activeIndex = 1
      break;
    case '/moment/add':
    case '/moment':
      activeIndex = 2
      break;
    case '/me':
      activeIndex = 3
      break;
  
    default:
      activeIndex = -1
      break;
  }
  // 点击导航
  const [ actived, setActived] = useState(activeIndex)
  const navigateTo = useNavigate()
  function handleNavClick(index){
    setActived(index)
    switch (index) {
      case 0:
        navigateTo('/')
        break;
      case 1: 
        navigateTo('/chat')
        break;
      case 2:
        navigateTo('/moment')
        break;
      case 3:
        navigateTo('/me')
      default:
        break;
    }
  }

  // 播放器

  // state
  const [playInfo, setPlayinfo] = useState({
    curIndex: -1,
    list: []
  })
  const [playState, setPlayState] = useState(false)
  const audioRef = useRef(null)
  // 加载音乐
  function loadMusic(list, index){
    console.log(list, index);
    setPlayinfo({
      curIndex:index,
      list:list
    })
    play()
  }
  // 当前播放音乐
  function curPlayMusic(playInfo){
    return {
      ...playInfo.list[playInfo.curIndex]
    }
  }
  
  // 控制
  function play(){
    setPlayState(true)
    setTimeout(()=>{
      if(audioRef.current){
        audioRef.current.play()
      }
    })
  }
  function pause(){
    setPlayState(false)
    setTimeout(()=>{
      audioRef.current.pause()
    })
  }
  function next(){
    setPlayinfo((playInfoRaw)=>{
      const playInfo = JSON.parse(JSON.stringify(playInfoRaw))
      console.log('playInfo', playInfo);
      if(playInfo.list && playInfo.list.length > 0){
        const length = playInfo.list.length
        const curIndex = playInfo.curIndex
        if(curIndex < 0 && curIndex >= length){
          message.error('音乐索引非法')
          return playInfo
        }
        if(curIndex === length - 1){
          message.warning('已经是最后一首')
          return playInfo
        }
        playInfo.curIndex = playInfo.curIndex + 1
        console.log('next', playInfo);
        return playInfo
      }
      else {
        console.log('请先选择音乐');
      }
      // play()
      return playInfo
    })
    // const copyInfo = JSON.parse(JSON.stringify(playInfo))
    // const length = copyInfo.list.length
    // if(length===0){
    //   message.error('请选择音乐文件')
    //   return
    // }
    // const curIndex = copyInfo.curIndex
    // if(curIndex < 0 && curIndex >= length){
    //   message.error('音乐索引非法')
    //   return
    // }
    // if(curIndex === length - 1){
    //   message.warning('已经是最后一首')
    //   return
    // }
    // // 下一首
    // copyInfo.curIndex++
    // setPlayinfo(copyInfo)
    // play()
  }
  function pre(){
    setPlayinfo((playInfoRaw)=>{
      const playInfo = JSON.parse(JSON.stringify(playInfoRaw))
      if(playInfo.list && playInfo.list.length > 0){
        const length = playInfo.list.length
        const curIndex = playInfo.curIndex
        if(curIndex < 0 && curIndex >= length){
          message.error('音乐索引非法')
          return playInfo
        }
        if(curIndex === 0){
          message.warning('已经是第一首')
          return playInfo
        }
        playInfo.curIndex = playInfo.curIndex - 1
        return playInfo
      }
      else {
        console.log('请先选择音乐');
      }
      // play()
      return playInfo
    })
  }
  function handleLike(index, state){ // 设置播放列表的第index个为喜欢或者不喜欢
    const musicId = playInfo.list[index]._id
    // console.log(musicId, state);
    setUserLikeMusic(musicId, state)
    // 更新本地状态
    const copyPlayInfo = JSON.parse(JSON.stringify(playInfo))

    copyPlayInfo.list[index].like = state
    setPlayinfo(copyPlayInfo)

  }
  // 自动播放

  useEffect(()=>{
    console.log('playInfo list', playInfo);
    // 标记音乐
    if(playInfo.curIndex>=0){
      musicMark(playInfo.list[playInfo.curIndex].id)
    }

    if(playInfo.list.length > 0){
      console.log('do');
      play()
    }
  }, [playInfo])


  
  // 真实dom渲染之后
  useEffect(()=>{
    audioRef.current.oncanplay = ()=>{
      console.log('可以播放');
    }
    audioRef.current.addEventListener('ended', ()=>{
      console.log('播放下一首');
      // 如果当前已经是最后一首了，那就不要播放了
      new Promise((resolve, reject)=>{
        setPlayinfo((playInfo)=>{
          if(playInfo.curIndex === playInfo.list.length - 1){
            reject()
          }
          else {
            resolve()
          }
          return playInfo
        })
      })
      .then(()=>{
        next()
      })
      .catch(()=>{
        message.warning('已经是最后一首')
        pause()
      })
      
    })
  }, [])

  // 数据改变之后
  useEffect(()=>{
    // console.log(playInfo);
  }, [playInfo])


  // 展示player
  const playerRef = useRef(null)
  function showPlayer(){
    playerRef.current.style.top = '0'
  }
  function closePlayer(){
    playerRef.current.style.top = '100%'
  }




  // 对话框未读消息


  const [unReadMsgData, setUnReadMsgData] = useState({
    list: []
  })
  function consumeUnReadMsgData(dialogId){
    setUnReadMsgData((unReadMsgData)=>{
      const targetIndex = unReadMsgData.list.findIndex(item=>item.dialogId === dialogId)
      unReadMsgData.list.splice(targetIndex, 1)
      return JSON.parse(JSON.stringify(unReadMsgData))
    })
  }

  const [loginState, setLoginState] = useState(false)
  function setLogin(state){
    setLoginState(state)
  }

  useEffect(()=>{
    // 加载的时候, 判断是否登录
    const loginId = window.sessionStorage.getItem('userid')
    if(loginId){
      setLoginState(true) 
    }
    else {
      setLoginState(false)
    }
    // 首次加载的时候，获取未读数据
    getAllDialogUnreadMsg()
    .then(data=>{
      console.log('data', data);
      setUnReadMsgData({
        list: data
      })
    })

  }, [])
  useEffect(()=>{
    console.log('未读消息', unReadMsgData.list);
  }, [unReadMsgData])


  const [socket, setSocket] = useState({
    ws: null
  })

  function createSocket(){
    let ws = socket.ws
    if(ws){ // 如果socket连接存在，则先关闭socket连接
      console.log('关闭socket连接');
      ws.close()
      setSocket({
        ws: null
      })
    }
    // 创建连接
    ws = new WebSocket('ws://localhost:8080');
    // 发送id绑定
    ws.onopen = ()=>{
      console.log('socket已经连接创建');
      ws.send(JSON.stringify({
        type: 'connect',
        value: window.sessionStorage.getItem('userid')
      }))
    }
    ws.onmessage = ({data})=>{
      const info = JSON.parse(data)
      switch (info.type) {
        case 'connect':
          console.log('[log]', info.value);
          break;
        case 'message':
          const { dialogId, msg } = info.value
          // 将消息添加到未读消息中
          setUnReadMsgData((unReadMsgData)=>{
            const dialogIndex = unReadMsgData.list.findIndex(item=>item.dialogId === dialogId) 
            if(dialogIndex === -1){ // 不存在
              const list = unReadMsgData.list
              list.push({
                dialogId,
                unReadlist: [msg]
              })
            }
            else {
              const list = unReadMsgData.list
              list[dialogIndex].unReadlist.push(msg)
            }
            return JSON.parse(JSON.stringify(unReadMsgData))
          })
        default:
          break;
      }
    }
    setSocket({
      ws
    })
  }
  // 如果登录了,  建立socket连接
  useEffect(()=>{
    console.log(`${loginState ? '登录了': '注销了'}`);
    if(loginState === true){
      createSocket()
    }
    else {
      // 断开socket连接
      if(socket.ws){
        socket.ws.close()
        setSocket({
          ws: null
        })
      }
    }
  }, [loginState])


  return (
    <div className={classes.box}>
      <div className={classes.main}>
        <div>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Home loadMusic={loadMusic}></Home>}/>
              <Route path="moment" element={<Outlet />}>
                <Route index element={<Moment />}></Route>
                <Route path="add" element={<AddMoment />}></Route>
                <Route path="detail" element={<MomentDetail />}></Route>
              </Route>
              <Route path="album/:id" element={<Album loadMusic={loadMusic} />} />
              <Route path="chat" element={<Outlet />} >
                <Route index element={<Chat unReadMsgData={unReadMsgData}/>}></Route>
                <Route path='dialog/:dialogId' element={<ChatDialog 
                  socket={socket}
                  unReadMsgData={unReadMsgData}
                  // consumeUnReadMsgData={consumeUnReadMsgData}
                  setUnReadMsgData={setUnReadMsgData}
                />}></Route>
              </Route>
              <Route path="me" element={<Outlet />} >
                <Route index element={<Me setLogin={setLogin} loadMusic={loadMusic} />}></Route>
                <Route path='setPassword' element={<SetPassword />}></Route>
                <Route path='setHeadIcon' element={<SetHeadIcon />}></Route>
              </Route>

              <Route path="search" element={<Search loadMusic={loadMusic}/>} />
            </Route>
            <Route />
            <Route path='/test' element={<Test></Test>}></Route>
            <Route path='/login' element={<Outlet></Outlet>}>
              <Route index element={<Login setLogin={setLogin}></Login>}></Route>
              <Route path='forget' element={<Forget></Forget>}></Route>
              <Route path='create' element={<CreateAccount></CreateAccount>}></Route>
            </Route>
          </Routes>
        </div>
      </div>
      <div className={classes.audio}>
        <audio
          id='audio'
          src={(playInfo.list.length > 0 && playInfo.curIndex >= 0 && playInfo.curIndex < playInfo.list.  length) ? 
            playInfo.list[playInfo.curIndex].musicUrl : ''
          }
          ref={audioRef}
        >
        </audio>
      </div>
      <div className={'playerMini'} onClick={showPlayer}>
        <PlayerMini
          playState={playState}
          play={play}
          pause={pause} 
          {...curPlayMusic(playInfo)}
        ></PlayerMini>
      </div>
      <div className={classes.footer}>
        <Nav actived={actived} onClick={handleNavClick} unReadMsgData={unReadMsgData}></Nav>
      </div>
      <div className={classes.player} 
          ref={playerRef}
      >
        <Player 
          pre={pre}
          next={next}
          play={play}
          pause={pause}
          playState={playState}
          closePlayer={closePlayer}
          handleLike={handleLike}
          curPlayIndex={playInfo.curIndex}
          {...curPlayMusic(playInfo)}
        ></Player>
      </div>
    </div>
    
  )
}

export default App
