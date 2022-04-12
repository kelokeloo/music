import classes from './index.module.scss'

import { PlusCircleOutlined } from '@ant-design/icons'

import { MomentCard } from '../../../components/moment/momentItem'

import { useNavigate } from 'react-router';

import { TokenTest } from '../../../components/common/tokenTest'

// 获取moment数据
import { getMoments } from '../../../Api/common/load'

import { useEffect, useState } from 'react';

import { baseUrl } from '../../../global.conf'

export function Moment(){
  const navigateTo = useNavigate()
  function goToAddMoment(){
    navigateTo('/moment/add')
  }
  const [moments, setMoments] = useState({
    list: []
  })

  useEffect(()=>{
    getMoments()
    .then(data=>{
      let list = data.moments
      // 数据处理 添加baseUrl
      list = list.map(item=>{
        item.headIcon = baseUrl + item.headIcon
        item.imgList = item.imgList.map(item=>{
          return baseUrl + item
        })
        return item
      })

      setMoments({
        list
      })
    })
  }, [])


  
  return (
    <div className={classes.box}>
      <header><PlusCircleOutlined className={classes.iconStyle} onClick={goToAddMoment}/></header>
      <div>
        {
          moments.list.map(moment=>{
            console.log('moment', moment);
            return (
              <MomentCard key={moment.time} 
                {...moment}
              ></MomentCard>
            )
          })
        }
      </div>
      <TokenTest></TokenTest>
    </div>
  )
}