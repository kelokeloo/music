import { Avatar } from 'antd';
import classes from './index.module.scss'
import { useNavigate } from 'react-router-dom'

export function ChatItem(props){
  const {_id:DialogId,content, headIcon, time, username} = props;
  
  const navigateTo = useNavigate() 
  function goToDialog(DialogId){
    navigateTo(`/chat/dialog/${DialogId}`)
  }
  return (
    <div className={classes.box}
      onClick={()=>goToDialog(DialogId)}
    >
      <Avatar size={45} src={headIcon}></Avatar>
      <div className={classes.main}>
        <div>
          <span>{username}</span>
          <span>{time}</span>
        </div>
        <div>{content}</div>
      </div>
    </div>
  )
}