import { Avatar } from 'antd';
import moment from 'moment';
import classes from './index.module.scss'

export function MsgBox(props){
  const { belong, time,
      type, text, musicId, 
    username, headIcon
  } = props
  const loginId = window.sessionStorage.getItem('userid')
  let state = loginId === belong ? 'left' : 'right'


  return (
    <div className={classes.box}>
      {
        state === 'right'?(
          <div className={classes.leftBox}>
            <Avatar src={headIcon}/>
            <div>
              <div className={classes.leftTitle}>
                <span>{username}</span>
                <span>{moment(time).fromNow()}</span>
              </div>
              <div className={classes.leftMain}>
                {text}
              </div>
            </div>
          </div>
        ):(
          <div className={classes.rightBox}>
            <Avatar src={headIcon}/>
            <div>
              <div className={classes.rightTitle}>
                <span>{username}</span>
                <span>{moment(time).fromNow()}</span>
              </div>
              <div className={classes.rightMain}>
                <div>
                  <span>
                  {text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}