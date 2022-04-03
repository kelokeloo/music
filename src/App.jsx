import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

// views
import { Home } from './views/Home/home'
import { Moment } from './views/Moment/moment'
import { Chat } from './views/Chat/chat'
import { Search } from './views/Search/search';

// footerNav
import { Nav } from './components/nav'

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
        navigateTo('/moment')
        break;
      case 2:
        navigateTo('/chat')
        break;
      case 3:
        navigateTo('/search')
      default:

        break;
    }
  }


  return (
    <div className={classes.box}>
      <div className={classes.main}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Home></Home>}/>
          </Route>
          <Route path="moment" element={<Moment />} />
          <Route path="chat" element={<Chat />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </div>
      <div className={classes.footer}>
        <Nav actived={actived} onClick={handleNavClick}></Nav>
      </div>
    </div>
    
  )
}

export default App
