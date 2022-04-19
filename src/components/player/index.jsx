import {
  CaretDownOutlined,
  HeartOutlined,
  PauseOutlined,
  BackwardOutlined,
  ForwardOutlined
} from '@ant-design/icons'

import classes from './index.module.scss'
import { useState, useEffect } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { Play } from '../../components/common/play'


export function Player(props){
  const {
    // 当前播放的音乐 
    duration,
    like,
    imgUrl, name, singer,
    curPlayIndex,
    handleLike,
    playState, 
    play, pause, pre, next,
    closePlayer
  } = props



  // slider value
  const [time, setTime] = useState({
    value: 0
  })
  useEffect(()=>{
    setTime({value: 0})
    const Interval = setInterval(() => {
      setTime((time)=>{
        if(time.value >= duration - 1){
          clearInterval(Interval)
        }
        return {
          value: time.value + 1
        }
      })
    }, 1000);
    return ()=>{
      clearInterval(Interval)
    }
  }, [duration])

  // 拖动事件条
  const handleSliderClick = (val)=>{
    setTime(val)
  }
  
  // 时间滚动条样式 
  const sliderLayout = {
    railStyle: {
      backgroundColor: 'rgba(224, 224, 224, .5)',
      height: '.5rem'
    },
    trackStyle: {
      backgroundColor: 'rgba(224, 224, 224, 1)',
      height: '.5rem'
    },
    handleStyle: {
      transform: 'translate(-50%, -13%)',
      border: 0,
      width: '1.5rem',
      height: '1.5rem',
      boxShadow: 'none',
      backgroundColor: 'rgb(224, 224, 224)'
    }
  }

  // 播放暂停 🆗
  function handlePlayerClick(){
    if(playState){ // 播放状态
      pause()
    }
    else{ // 暂停状态
      play()
    }
  }


  return (
    <div className={classes.box}>
      <header className={classes.header} onClick={closePlayer}><CaretDownOutlined className={classes.iconStyle} /></header>
      <div className={classes.mainBox}>
        <div className={classes.main}>
          <div className={classes.mainImg}>
            <img src={imgUrl}/>
          </div>
        </div>
        <div className={classes.control}>
          <div className={classes.like} onClick={()=>handleLike(curPlayIndex, !like)}>
            <div className={like ? classes.likeActive : classes.likeDeactive}>
              <svg className={classes.icon} aria-hidden="true">
                <use xlinkHref={"#icon-likefill"}></use>
              </svg>
            </div>
              
          </div>
          <div className={classes.info}>
            <span>{name}</span>
            <span>{singer}</span>
          </div>
          <div>
            {/* 时间模块 */}
          </div>
          <div className={classes.ctrl}>
            <BackwardOutlined className={classes.ctrlIconStyle} onClick={pre}/>
            <span className={classes.playing} onClick={handlePlayerClick}>
              {!playState ? <Play></Play> : <PauseOutlined className={classes.pauseStyle}/>}
            </span>
            <ForwardOutlined className={classes.ctrlIconStyle} onClick={next}/>
          </div>
        </div>
      </div>
      
    </div>
  )
}