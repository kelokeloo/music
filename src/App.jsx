import { useState, useRef } from 'react'
import logo from './logo.svg'
import './App.css'

import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

// views
import { Home } from './views/Home/home'
import { Moment } from './views/Moment/moment'
import { Chat } from './views/Chat/chat'
import { Me } from './views/Me/me';
import { AddMoment } from './views/Moment/addMoment';

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
        navigateTo('/search')
      default:
        break;
    }
  }

  // player
  const [isPlaying, setIsPlaying] = useState(true)
  const playerPageRef = useRef(null)
  const playerRef = useRef(null)
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



  return (
    <div className={classes.box}>
      <div className={classes.main}>
        <div>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Home></Home>}/>
              <Route path="moment" element={<Outlet />}>
                <Route index element={<Moment />}></Route>
                <Route path="add" element={<AddMoment />}></Route>
              </Route>

              <Route path="chat" element={<Chat />} />
              <Route path="search" element={<Me />} />
            </Route>
            <Route />
          </Routes>
        </div>
      </div>
      <div>
        <PlayerMini isPlaying={isPlaying} onPlayingClick={handlePlayingClick} onPlayerClick={handlePlayerClick}></PlayerMini>
      </div>
      <div className={classes.footer}>
        <Nav actived={actived} onClick={handleNavClick}></Nav>
      </div>
      <div className={classes.audio}>
        <audio
          // controls
          // autoPlay
          ref={playerRef}
          src="http://localhost:3001/music/%E5%BC%B5%E5%AD%90%E9%93%AD%20-%20%E8%B0%81%E6%84%BF%E6%94%BE%E6%89%8B.mp3"
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
