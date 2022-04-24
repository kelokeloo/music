import { TokenTest } from '../../../components/common/tokenTest'
import classes from './index.module.scss'

import {
  ArrowLeftOutlined
} from '@ant-design/icons'
import { Input, Tabs } from 'antd';
const { TabPane } = Tabs;

import { useNavigate } from 'react-router';
import { useRef, useEffect, useState } from 'react';

import { searchByKey, getUserFocusList } from '../../../Api/common/load/index'

// musicItem
import { MusicItem } from '../../../components/common/musicItem'
import { AlbumItem } from '../../../components/common/albumItem'
import { UserItem } from '../../../components/common/userItem'

// baseUrl 
import { baseUrl } from '../../../global.conf';



export function Search(props){
  const { loadMusic } = props
  async function doSearch(type, value){
    if(!value) return
    setKeyWord(value) // 记录搜索内容
    const data = await searchByKey(type, value) // 搜索api
    let { data: list } = data
    // 如果搜索内容type是user，做一下初始化
    switch (type) {
      case 'user':
        getUserFocusList()
        .then(({data: focusList})=>{
          list = list.map(item=>{
            if(focusList.includes(item._id)){
              item.focusInitState = true
            }
            else {
              item.focusInitState = false
            }
            return item
          })
          setShowData({
            list: list
          })
        })
        break;
      case 'music': 
        list = list.map(item=>{
          item.imgUrl = baseUrl + item.imgUrl
          item.musicUrl = baseUrl + item.musicUrl
          return item
        })
        console.log('list', list);
        setShowData({
          list: list
        })
        break;
      case 'album':
        console.log('list', list);
        list = list.map(item=>{
          item.imgUrl = baseUrl + item.imgUrl
          return item
        })
        setShowData({
          list: list
        })

      default:
        break;
    }

  }
  // router
  const navigateTo = useNavigate()
  function goBack(){
    navigateTo(-1)
  }
  // input ref
  const inputRef = useRef(null)
  useEffect(()=>{
    inputRef.current.focus()
  }, [])

  // 搜索关键字
  const [keyWord, setKeyWord] = useState('')
  // 搜索类型
  const [type, setType] = useState('music')

  function onTabChange(type){
    // 清空数据
    setShowData({
      list: []
    })
    setType(type)
    doSearch(type, keyWord)
  }
  // show data
  const [showData, setShowData] = useState({
    list: []
  })

  // TabPane data
  const TabPaneData = [
    {tab: '音乐', key: 'music'},
    {tab: '歌单', key: 'album'},
    {tab: '用户', key: 'user'},
  ]

  function CreateItem(props){
    const { type, list } = props
    let result = undefined
    console.log('list', list);
    switch (type) {
      case 'music':
        if(!list.length) break;
        result = list.map((item,index)=>{
          return (
            <MusicItem 
              key={item._id}
              list={list}
              index={index}
              loadMusic={loadMusic}></MusicItem>
          )
        })
        break;
      case 'album':
        if(!list.length) break;
        result = list.map(item=>{
          return (
            <AlbumItem 
              key={item._id}
              imgUrl={item.imgUrl} 
              title={item.title}
              content={item.content}
              id={item.id}></AlbumItem>
          )
        })
        break;
      case 'user':
        if(!list.length) break;
        result = list.map(item=>{
          return (
            <UserItem 
              focusInitState = {item.focusInitState}
              key={item._id}
              headIcon={baseUrl + item.headIcon} 
              username={item.username}
              _id={item._id}></UserItem>
          )
        })
        break;
    
      default:
        break;
    }
    return result ?? <div></div>
  }


  return (
    <div>
      <header className={classes.header}>
        <ArrowLeftOutlined className={classes.iconStyle} onClick={goBack}/>
        <Input.Search ref={inputRef} placeholder="搜索" onSearch={(value)=>doSearch(type, value)}></Input.Search>
      </header>
      <div className={classes.body}>
      <Tabs defaultActiveKey={type} onChange={onTabChange} centered tabBarGutter={100}>
        {
          TabPaneData.map(item=>{
            return (
              <TabPane tab={item.tab} key={item.key}>
                <div className={classes.TabBox}>
                  <CreateItem  list={showData.list} type={item.key}></CreateItem>
                </div>
              </TabPane>
            )
          })
        }
      </Tabs>
      </div>
      <TokenTest></TokenTest>
    </div>
  )
}