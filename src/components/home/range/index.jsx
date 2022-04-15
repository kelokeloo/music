import classes from './index.module.scss'
import { List, Avatar } from 'antd';
import { useEffect, useState } from 'react'
import { getRange } from '../../../Api/home';
import { getMusicById } from '../../../Api/common/load'
import { baseUrl } from '../../../global.conf.js'

import { MusicItem } from '../../common/musicItem'

export function Range(props){
  const { loadMusic, loadPlayList } = props
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

  useEffect(()=>{
    let cancel = false
    let timer = null;

    getRange()
    .then((data)=>{
      if(cancel) return
      const musicList = data.musicList
      const promises = musicList.map(item=>{
        return getMusicById(item)
      })
      return Promise.all(promises)
    })
    .then((resList)=>{
      if(cancel) return
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
    }) 
    .catch(e=>{
      console.error(e)
    })
    
    return ()=>{
      cancel = true
    }
  }, [])

  // 处理排行榜的点击
  function handleRangeClick(){
    console.log('click range');
    // 加载当前播放列表
    const copyData = JSON.parse(JSON.stringify(data))
    loadPlayList(copyData.list)
  }

  return (
    <div className={classes.range} onClick={handleRangeClick}>
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