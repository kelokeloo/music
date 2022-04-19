import {
  ArrowLeftOutlined
} from '@ant-design/icons'
import classes from './index.module.scss'
import { useNavigate } from 'react-router-dom'

export function Header(){
  const navigateTo = useNavigate()
  return (
    <div className={classes.box}>
      <ArrowLeftOutlined className={classes.iconStyle} onClick={()=>navigateTo(-1)}/>
    </div>
  )
}