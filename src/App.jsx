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
  const playerRef = useRef(null)
  //  点击播放按钮
  const handlePlayingClick = ()=>{
    const state = !isPlaying
    setIsPlaying(state)
  }

  //  点击playerMini播放按钮以外的地方
  const handlePlayerClick = ()=>{
    console.log('click');
    playerRef.current.style.top = '0'
  }
  // player 返回
  const handlePlayerClose = ()=>{
    playerRef.current.style.top = '100%'
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
      <div className={classes.player} ref={playerRef}>
        <Player onPlayerClose={handlePlayerClose}></Player>
      </div>
    </div>
    
  )
}

export default App
