import { Avatar } from 'antd';
import moment from 'moment';
import classes from './index.module.scss'

export function MsgBox(props){
  const { belong,
      content, timeStamp, 
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
                <span>{moment(timeStamp).fromNow()}</span>
              </div>
              <div className={classes.leftMain}>
                {content.value}
              </div>
            </div>
          </div>
        ):(
          <div className={classes.rightBox}>
            <Avatar src={headIcon}/>
            <div>
              <div className={classes.rightTitle}>
                <span>{username}</span>
                <span>{moment(timeStamp).fromNow()}</span>
              </div>
              <div className={classes.rightMain}>
                <div>
                  <span>
                  {content.value}
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