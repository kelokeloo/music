import classes from './index.module.scss'
import { useNavigate } from 'react-router'
import { useEffect } from 'react';

export function TokenTest(){
  const navigateTo = useNavigate();
  useEffect(()=>{
  // 判断本地是否有token 如果没有就跳转
    if(!window.sessionStorage.token){
      navigateTo('/login')
    }
  }, [])
  

  return (
    <div className={classes.box}></div>
  )
}