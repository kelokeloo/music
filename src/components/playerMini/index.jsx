import classes from './index.module.scss'
import { Avatar } from 'antd';

import { 
  CustomerServiceOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons'

export function PlayerMini(props){
  const {isPlaying,  onPlayingClick, onPlayerClick } = props
  return (
    <div className={classes.player} onClick={onPlayerClick}>
      <Avatar className={classes.logo} size="large" icon={<CustomerServiceOutlined />}></Avatar>
      <div className={classes.info}>
        <span>指纹</span>
        <span>-杜宣达</span>
      </div>
      <div onClick={(ev)=>{ev.stopPropagation(); onPlayingClick()}}>
        {
          isPlaying ? <PlayCircleOutlined className={classes.iconStyle}/> : <PauseCircleOutlined className={classes.iconStyle}/>
        } 
      </div>
    </div>
  )
}