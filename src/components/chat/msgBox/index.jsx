import { Avatar } from 'antd';
import moment from 'moment';
import classes from './index.module.scss'

export function MsgBox(props){
  console.log('props', props);
  const { belong, text, time, musicId, username, headIcon} = props
  const loginId = window.sessionStorage.getItem('userid')
  let state = loginId === belong ? 'right' : 'left'


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
                message
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
                  message
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