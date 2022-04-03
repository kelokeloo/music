import { 
  CustomerServiceOutlined,
  SearchOutlined, 
  CommentOutlined,
  InstagramOutlined
} from '@ant-design/icons'

import classes from './index.module.scss'

import { useState } from 'react'




export function Nav(props){
  const { actived, onClick } = props


  const layout = {
    style: {
      fontSize: '1.6rem'
    }
  }

  const icons = [
    <CustomerServiceOutlined {...layout} />,
    <CommentOutlined {...layout} />,
    <InstagramOutlined {...layout} />,
    <SearchOutlined {...layout}/>
  ]

  function handleNavClick(index){
    onClick(index)
  }

  return (
    <div className={classes.box}>
      {
        icons.map((item, index)=>{
          return (
            <div className={classes.navItemBox} onClick={()=>{handleNavClick(index)}}>
              <section className={actived === index ? classes.activedStyle : ''}>
                {item}
              </section>
            </div>
            
          )
        })
      }
    </div>
  )
}