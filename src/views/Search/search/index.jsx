import { TokenTest } from '../../../components/common/tokenTest'
import classes from './index.module.scss'

import {
  ArrowLeftOutlined
} from '@ant-design/icons'
import { Input, Tabs } from 'antd';
const { TabPane } = Tabs;

import { useNavigate } from 'react-router';
import { useRef, useEffect, useState } from 'react';

import { searchByKey } from '../../../Api/common/load/index'

// musicItem
import { MusicItem } from '../../../components/common/musicItem'
// baseUrl 
import { baseUrl } from '../../../global.conf';



export function Search(props){
  const { loadMusic } = props
  async function doSearch(type, value){
    if(!value) return
    setKeyWord(value) // 记录搜索内容
    const data = await searchByKey(type, value) // 搜索api
    const { data: list } = data
    // setState
    setShowData({
      list: list
    })

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
    switch (type) {
      case 'music':
        if(!list.length) break;
        result = list.map(item=>{
          return (
            <MusicItem 
              key={item._id}
              imgUrl={baseUrl + item.imgUrl} 
              musicUrl={baseUrl + item.musicUrl} 
              name={item.name}
              singer={item.singer}
              id={item.id}
              loadMusic={loadMusic}></MusicItem>
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