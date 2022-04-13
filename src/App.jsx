import { useState, useRef } from 'react'
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

// footerNav
import { Nav } from './components/nav'
// playerMini
import { PlayerMini } from './components/playerMini';
// player
import { Player } from './components/player'

// style
import classes from './App.module.scss'





function App() { 
  // nav
  const [ actived, setActived] = useState(0)
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

  // player
  const [isPlaying, setIsPlaying] = useState(true)
  const playerPageRef = useRef(null)
  const playerRef = useRef(null)
  const [playingMusic, setPlayingMusic] = useState('')
  const [musicInfo, setMusicInfo] = useState({
    info:{
      name: '',
      singer: '',
      imgUrl: ''
    }
  })
  //  点击播放按钮
  const handlePlayingClick = ()=>{
    const state = !isPlaying
    if(state){
      playerRef.current.pause()
    }
    else {
      playerRef.current.play()
    }
    setIsPlaying(state)
  }

  //  点击playerMini播放按钮以外的地方
  const handlePlayerClick = ()=>{
    playerPageRef.current.style.top = '0'
  }
  // player 返回
  const handlePlayerClose = ()=>{
    playerPageRef.current.style.top = '100%'
  }

  // 加载音乐
  const loadMusic = (music)=>{
    const { musicUrl, name, singer, imgUrl } = music
    setPlayingMusic(musicUrl)
    setMusicInfo({
      info: {
        name,
        singer,
        imgUrl
      }
    })
    setIsPlaying(false)
    setTimeout(()=>{
      playerRef.current.play()
    }, 0)
  }

  const [showOptions, setShowOptions] = useState(true)

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
                <Route index element={<Chat />}></Route>
                <Route path='dialog/:dialogId' element={<ChatDialog />}></Route>
              </Route>
              <Route path="me" element={<Me />} />
              <Route path="search" element={<Search loadMusic={loadMusic} />} />
            </Route>
            <Route />
            
            <Route path='/login' element={<Outlet></Outlet>}>
              <Route index element={<Login></Login>}></Route>
              <Route path='forget' element={<Forget></Forget>}></Route>
              <Route path='create' element={<CreateAccount></CreateAccount>}></Route>
            </Route>
          </Routes>
        </div>
      </div>
      <div className={'playerMini'}>
        <PlayerMini 
          isPlaying={isPlaying} 
          {...musicInfo.info}
          onPlayingClick={handlePlayingClick} onPlayerClick={handlePlayerClick}
        ></PlayerMini>
      </div>
      <div className={classes.footer}>
        <Nav actived={actived} onClick={handleNavClick}></Nav>
      </div>
      <div className={classes.audio}>
        <audio
          // controls
          // autoPlay
          ref={playerRef}
          src={playingMusic}
        >
          <code>audio</code> element.
        </audio>
      </div>
      <div className={classes.player} ref={playerPageRef}>
        <Player onPlayerClose={handlePlayerClose} 
          playState={isPlaying} onPlayStateChange={handlePlayingClick}
        ></Player>
      </div>
    </div>
    
  )
}

export default App
