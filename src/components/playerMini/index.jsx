import classes from './index.module.scss'
import { Avatar } from 'antd';

import { 
  CustomerServiceOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons'

export function PlayerMini(props){
  const { onPlayingClick, onPlayerClick,
    name, singer, imgUrl,
    playState,
    play, pause
   } = props
   function handleClick(ev){
    ev.stopPropagation();
    if(playState){// 播放
      pause()
    }
    else {
      play()
    }
   }
  return (
    <div className={classes.player} onClick={onPlayerClick}>
      <Avatar className={classes.logo} size="large" src={imgUrl}></Avatar>
      <div className={classes.info}>
        <span>{name}</span>
        <span>-{singer}</span>
      </div>
      <div onClick={handleClick}>
        {
          !playState ? <PlayCircleOutlined className={classes.iconStyle}/> : <PauseCircleOutlined className={classes.iconStyle}/>
        } 
      </div>
    </div>
  )
}