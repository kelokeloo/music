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







function App(props) { 
  const { socket, messagePool } = props

  // nav
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

  // player
  const [isPlaying, setIsPlaying] = useState(true)
  const playerPageRef = useRef(null)
  const playerRef = useRef(null)
  const [playingMusic, setPlayingMusic] = useState('')
  const [musicInfo, setMusicInfo] = useState({
    info:{
      name: '',
      singer: '',
      imgUrl: '',
      id: ''
    }
  })
  const [musicDuration, setMusicDuration] = useState(0)
  // 音乐播放列表
  const [playList, setPlayList] = useState({
    list: []
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
    const { musicUrl, name, singer, imgUrl, id } = music
    setPlayingMusic(musicUrl)
    setMusicInfo({
      info: {
        name,
        singer,
        imgUrl,
        id,
        musicUrl
      }
    })
    setIsPlaying(false)
    setTimeout(()=>{
      const audioEle = playerRef.current
      audioEle.play()

      // 音乐持续时间
      let audio = document.createElement('audio') //生成一个audio元素 
      audio.src = musicUrl //音乐的路径 
      audio.addEventListener("canplay", function() {
        setMusicDuration(parseInt(audio.duration))
      });
      
      
    }, 0)

  }

  useEffect(()=>{
    // 先移除事件再添加事件
    // 播放停止之后做的事情
    function listener(){
      console.log('播放结束');
      if(playList.list.length !== 0){
        // 播放下一首
        const curMusicId = musicInfo.info.id
        console.log('当前播放id', curMusicId);
        // 
        let index = playList.list.findIndex(item=>item.id === curMusicId)
        const length = playList.list.length
        console.log(index, length - 1);
        if(index < length - 1){// 不是最后一首的时候
          index++
          const musicInfo={
            name: playList.list[index].name,
            singer: playList.list[index].singer,
            imgUrl: playList.list[index].imgUrl,
            id: playList.list[index].id,
            musicUrl: playList.list[index].musicUrl
          }
          loadMusic(musicInfo)
        }
        else{
          // 最后一首的时候
          console.log('最后一首');
          handlePlayingClick()
          // playerRef.current.pause()
        }
      }
      console.log('playList', playList);
    }
    // 移除
    playerRef.current.removeEventListener('ended', listener)
    
    // 添加事件
    playerRef.current.addEventListener('ended', listener)

  }, [playList])

  // 下一首上一首
  const switchMusic = (options)=>{
    console.log(options);
    const curMusicId = musicInfo.info.id
    console.log(playList);

    // 找到当前音乐的下标
    if(playList.list){
      let index = playList.list.findIndex(item => item.id === curMusicId)
      const length = playList.list.length
      if(options === 'pre'){
        index = index - 1
      }
      else {
        index = index + 1
      }
      if(index >= 0 && index < length){
        const music = playList.list[index]
        loadMusic(music)
      }
    }


  }



  // 加载播放列表
  function loadPlayList(list){
    console.log('playList', list);
    setPlayList({
      list: list
    })
  }

  const [showOptions, setShowOptions] = useState(true)

  return (
    <div className={classes.box}>
      <div className={classes.main}>
        <div>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Home loadMusic={loadMusic} loadPlayList={loadPlayList}></Home>}/>
              <Route path="moment" element={<Outlet />}>
                <Route index element={<Moment />}></Route>
                <Route path="add" element={<AddMoment />}></Route>
                <Route path="detail" element={<MomentDetail />}></Route>
              </Route>
              <Route path="album/:id" element={<Album loadMusic={loadMusic} />} />
              <Route path="chat" element={<Outlet />} >
                <Route index element={<Chat messagePool={messagePool} />}></Route>
                <Route path='dialog/:dialogId' element={<ChatDialog socket={socket} messagePool={messagePool}/>}></Route>
              </Route>
              <Route path="me" element={<Me />} />
              <Route path="search" element={<Search loadMusic={loadMusic} />} />
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
          id='audio'
          ref={playerRef}
          src={playingMusic}
        >
        </audio>
      </div>
      <div className={classes.player} ref={playerPageRef}>
        <Player onPlayerClose={handlePlayerClose} 
          playState={isPlaying} onPlayStateChange={handlePlayingClick}
          songName={musicInfo.info.name}
          imgUrl={musicInfo.info.imgUrl}
          singer={musicInfo.info.singer}
          duration = {musicDuration}
          pre={()=>{switchMusic('pre')}}
          next={()=>{switchMusic('next')}}
        ></Player>
      </div>
    </div>
    
  )
}

export default App
