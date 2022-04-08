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
    list: [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
      {
        title: 'Ant Design Title 4',
      },
    ]
  })

  useEffect(async()=>{
    try{
      const data = await getRange()
      const musicList = data.musicList
      const promises = musicList.map(item=>{
        return getMusicById(item)
      })
      let resList = await Promise.all(promises)
      // 解包
      resList = resList.map(item=>{
        item = item.data
        item.imgUrl = baseUrl + item.imgUrl
        item.musicUrl = baseUrl + item.musicUrl
        return item
      })
      setData({
        list: resList
      })
      console.log(resList);
    }
    catch(e){
      console.log(e);
    }
  }, [])

  return (
    <div className={classes.range}>
      <h2>排行榜</h2>
      <List
        itemLayout="horizontal"
        dataSource={data.list}
        renderItem={(item, index) => (
          <List.Item>
            <span className={classes.rangeNumber}>{index + 1}</span>
            <MusicItem {...item} loadMusic={loadMusic}></MusicItem>
          </List.Item>
        )}
      />
    </div>
  )
}