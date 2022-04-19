import classes from './index.module.scss'
import { List, Avatar } from 'antd';
import { useEffect, useState } from 'react'
import { getRange } from '../../../Api/home';
import { getMusicById } from '../../../Api/common/load'
import { baseUrl } from '../../../global.conf.js'

import { MusicItem } from '../../common/musicItem'

export function Range(props){
  const { loadMusic } = props
  const [data, setData] = useState({
    list: []
  })
  // 获取排行榜音乐
  useEffect(()=>{
    let cancel = false
    let timer = null;

    getRange()
    .then((res)=>{
      if(cancel) return
      if(res.code !== 200){
        console.error(res.error);
      }
      // 解包
      const resList = res.data.map(item=>{
        item.imgUrl = baseUrl + item.imgUrl
        item.musicUrl = baseUrl + item.musicUrl
        return item
      })
      setData({
        list: resList
      })
      console.log('rangeData', resList);
    }) 
    .catch(e=>{
      console.error(e)
    })
    
    return ()=>{
      cancel = true
    }
  }, [])

  return (
    <div className={classes.range}>
      <h2>排行榜</h2>
      <div className={classes.list}>
        {
          data.list.map((item, index)=>{
            return (
              <div className={classes.item}
                key={item._id}
              >
                <span>{index + 1}</span>
                <div>
                  <MusicItem list={data.list} index={index} loadMusic={loadMusic}></MusicItem>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}