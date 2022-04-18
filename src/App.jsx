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






function App(props) { 
  const { socket, messagePool } = props

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
      audioRef.current.play()
    })
  }
  function pause(){
    setPlayState(false)
    setTimeout(()=>{
      audioRef.current.pause()
    })
  }
  function next(){
    const copyInfo = JSON.parse(JSON.stringify(playInfo))
    const length = copyInfo.list.length
    if(length===0){
      message.error('请选择音乐文件')
      return
    }
    const curIndex = copyInfo.curIndex
    if(curIndex < 0 && curIndex >= length){
      message.error('音乐索引非法')
      return
    }
    if(curIndex === length - 1){
      message.warning('已经是最后一首')
      return
    }
    // 下一首
    copyInfo.curIndex++
    setPlayinfo(copyInfo)
    play()
  }
  function pre(){
    console.log('上一首');
    const copyInfo = JSON.parse(JSON.stringify(playInfo))
    const length = copyInfo.list.length
    if(length===0){
      message.error('请选择音乐文件')
      return
    }
    const curIndex = copyInfo.curIndex
    if(curIndex < 0 && curIndex >= length){
      message.error('音乐索引非法')
      return
    }
    if(curIndex === 0){
      message.warning('当前音乐就是第一首')
      return
    }
    // 下一首
    copyInfo.curIndex--
    setPlayinfo(copyInfo)
    play()
  }
  
  // 真实dom渲染之后
  useEffect(()=>{
    audioRef.current.oncanplay = ()=>{
      console.log('可以播放');
    }
  }, [])

  // 数据改变之后
  useEffect(()=>{
    console.log(playInfo);
  }, [playInfo])


  // 展示player
  const playerRef = useRef(null)
  function showPlayer(){
    playerRef.current.style.top = '0'
  }
  function closePlayer(){
    playerRef.current.style.top = '100%'
  }

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
              <Route path="album/:id" element={<Album />} />
              <Route path="chat" element={<Outlet />} >
                <Route index element={<Chat messagePool={messagePool} />}></Route>
                <Route path='dialog/:dialogId' element={<ChatDialog socket={socket} messagePool={messagePool}/>}></Route>
              </Route>
              <Route path="me" element={<Me />} />
              <Route path="search" element={<Search />} />
            </Route>
            <Route />
            <Route path='/test' element={<Test></Test>}></Route>
            <Route path='/login' element={<Outlet></Outlet>}>
              <Route index element={<Login socket={socket}></Login>}></Route>
              <Route path='forget' element={<Forget></Forget>}></Route>
              <Route path='create' element={<CreateAccount></CreateAccount>}></Route>
            </Route>
          </Routes>
        </div>
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
        <Nav actived={actived} onClick={handleNavClick}></Nav>
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
          {...curPlayMusic(playInfo)}
        ></Player>
      </div>
    </div>
    
  )
}

export default App
