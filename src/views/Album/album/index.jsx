import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from 'react'

import { getAlbumById, getMusicById } from '../../../Api/common/load/index'

import classes from './index.module.scss'

import { baseUrl } from "../../../global.conf"

import { List,Avatar  } from 'antd';

import { TokenTest } from '../../../components/common/tokenTest'
// mark
// import { musicMark } from '../../../Api/common/load'

import {
  ArrowLeftOutlined
} from '@ant-design/icons'

export function Album(props){
  const { loadMusic } = props
  const params = useParams()
  const id = params.id
  const [albumInfo, setAlbumInfo] = useState({
    info: {
      title: '',
      content: '',
      imgUrl: '',
      musicList: []
    }
  })
  const [musicList, setMusicList] = useState({
    list: []
  })
  const navigateTo = useNavigate()

  // 获取album 数据
  useEffect(async ()=>{
    const {data} = await getAlbumById(id)
    console.log('album', data);
    data.imgUrl = baseUrl + data.imgUrl


    setAlbumInfo({
      info: data
    })
    // 获取歌单的所有音乐
    const promises =  data.musicList.map(item=>{
      return getMusicById(item)
    })
    let datas = await Promise.all(promises)
    // 数据转换一下
    datas = datas.map(item=>{
      item.data.imgUrl = baseUrl + item.data.imgUrl
      item.data.musicUrl = baseUrl + item.data.musicUrl
      return item.data
    })
    setMusicList({
      list: datas
    })

  }, [])

  // 点击音乐的时候
  function handleMusicClick(music, index){
    // console.log(music);
    // musicMark(music.id)
    loadMusic(musicList.list, index)
  }

  // 渲染音乐列表
  function CreateMusicList(props){
    const { list } = props
    return (
      <List
        bordered
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item onClick={()=>{handleMusicClick(item, index)}}>
            <List.Item.Meta
              avatar={<Avatar src={item.imgUrl} />}
              title={item.name}
              description={item.singer}
            />
          </List.Item>
        )}
      />
    )
  }

  // 退出
  function goBack(){
    navigateTo(-1)
  }


  return (
    <div className={classes.box}>
      <header>
        <ArrowLeftOutlined className={classes.iconStyle} onClick={goBack}/>
      </header>
      <main className={classes.main}>
        <div className={classes.img}>
          <img src={albumInfo.info.imgUrl} alt="" />
        </div>
        <div className={classes.albumInfo}>
          <h2>{albumInfo.info.title}</h2>
          <p>{albumInfo.info.content}</p>
        </div>
        <div className={classes.musicList}>
          <CreateMusicList list={musicList.list}></CreateMusicList>
        </div>
      </main>
      <TokenTest></TokenTest>
    </div>
  )
}