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
  const { onPlayerClose, 
    playState, onPlayStateChange,imgUrl, songName, singer, duration, 
    pre, next
  } = props


  const [likeActive, setLikeActive] = useState(true)



  const handleLikeClick = ()=>{
    const state = !likeActive
    setLikeActive(state)
  }

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
  
  // sliderLayout 
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
      // border: '1px solid rgba(211, 58, 44)',
      border: 0,
      width: '1.5rem',
      height: '1.5rem',
      boxShadow: 'none',
      backgroundColor: 'rgb(224, 224, 224)'
    }
  }


  return (
    <div className={classes.box}>
      <div className={classes.shadow}
        style={{
          background: `url(${imgUrl}) center center no-repeat`,
          fontSize: '2rem',
          filter: 'blur(10px)'
        }}
      ></div>
      <header className={classes.header} onClick={onPlayerClose}><CaretDownOutlined className={classes.iconStyle} /></header>
      <div className={classes.mainBox}>
        <div className={classes.main}>
          <div className={classes.mainImg}>
            <img src={imgUrl}/>
          </div>
        </div>
        <div className={classes.control}>
          <div className={classes.like} onClick={handleLikeClick}>
            <div className={likeActive ? classes.likeActive : classes.likeDeactive}>
              <svg className={classes.icon} aria-hidden="true">
                <use xlinkHref={"#icon-likefill"}></use>
              </svg>
            </div>
              
          </div>
          <div className={classes.info}>
            <span>{songName}</span>
            <span>{singer}</span>
          </div>
          <div>
            <Slider
              className={classes.slider}
              onChange={handleSliderClick}
              min={0}
              max={duration}
              value={time.value}
              step={1}
              {...sliderLayout}
            ></Slider>
            <div className={classes.time}>
              <span>{time.value}</span>
              <span>{duration}</span>
            </div>
          </div>
          <div className={classes.ctrl}>
            <BackwardOutlined className={classes.ctrlIconStyle} onClick={pre}/>
            <span className={classes.playing} onClick={onPlayStateChange}>
              {playState ? <Play></Play> : <PauseOutlined className={classes.pauseStyle}/>}
            </span>
            <ForwardOutlined className={classes.ctrlIconStyle} onClick={next}/>
          </div>
        </div>
      </div>
      
    </div>
  )
}