import {
  CaretDownOutlined,
  HeartOutlined,
  PauseOutlined,
  BackwardOutlined,
  ForwardOutlined
} from '@ant-design/icons'

import classes from './index.module.scss'
import { useState } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { Play } from '../../components/common/play'

export function Player(props){
  const { onPlayerClose} = props
  let { imgUrl, songName, singer, duration } = props
  imgUrl = imgUrl??'/img/4.jpg'
  songName = songName??'指纹'
  singer = singer?? '杜宣达'
  duration = duration?? 200
  // isPlaying = isPlaying?? false

  const [likeActive, setLikeActive] = useState(true)

  // 是否播放
  const [isPlaying , setIsPlaying] = useState(false)

  const handleLikeClick = ()=>{
    const state = !likeActive
    setLikeActive(state)
  }

  // slider value
  const [time, setTime] = useState(20)

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

  // 播放暂停
  const handlePlayingClick = ()=>{
    const state = !isPlaying;
    setIsPlaying(state)
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
              defaultValue={time}
              step={1}
              
              {...sliderLayout}
            ></Slider>
            <div className={classes.time}>
              <span>{time}</span>
              <span>{duration}</span>
            </div>
          </div>
          <div className={classes.ctrl}>
            <BackwardOutlined className={classes.ctrlIconStyle}/>
            <span className={classes.playing} onClick={handlePlayingClick}>
              {isPlaying ? <Play></Play> : <PauseOutlined className={classes.pauseStyle}/>}
            </span>
            <ForwardOutlined className={classes.ctrlIconStyle} />
          </div>
        </div>
      </div>
      
    </div>
  )
}