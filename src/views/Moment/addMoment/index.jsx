import classes from './index.module.scss'

import { CloseCircleOutlined, PlusSquareOutlined, PlusOutlined  } from '@ant-design/icons'
import { Card, Avatar, Input, Form, Upload, Modal,Button, message   } from 'antd';
const { TextArea } = Input;
const { Meta } = Card;
import { useRef, useEffect, useState } from 'react'

import { useNavigate } from 'react-router';

import { TokenTest } from '../../../components/common/tokenTest'
import { baseUrl } from '../../../global.conf'

import { publishMoment } from '../../../Api/common/load'

import http from '../../../Api/common/http'
//time
import moment from 'moment';





export function AddMoment(props){
  const inputRef = useRef(null);
  const navigateTo = useNavigate()
  
  const imgList = ['/img/1.jpg', '/img/2.jpg']
  const content = 'asdjfisadjfo yes go good yar asdjfisadjfo yes go good yar asdjfisadjfo yes go good yar asdjfisadjfo yes go good yar '

  // 用户信息
  const headIcon = window.sessionStorage.getItem('headIcon')
  const username = window.sessionStorage.getItem('username')

  useEffect(() => {
    inputRef.current.focus()
  }, []);

  function goBack(){
    navigateTo(-1)
  }

  
  // 图片上传
  const uploadAddress = '/api/upload'
  const [uploadImageList, setUploadImageList] = useState({
    list: []
  })

  const fileInputRef = useRef(null)

  function publish(){
    const content = inputRef.current.resizableTextArea.props.value
    let list = uploadImageList.list
    // 对上传数据进行处理
    list = list.map(item=>{
      return item.substring(baseUrl.length)
    })
    const data = {
      content, 
      imgList: list,
      time: moment().format()
    }
    publishMoment(data)
    .then(data=>{
      if(data.code === 200){
        message.success('发布成功')
        navigateTo('/moment')
      }
      else{
        message.error('发布失败')
      }
      console.log(data);
    })
    
    
  }

  function handleInputChange(e){
    const file =  fileInputRef.current.value
    const formData = new FormData()
    
    const files = fileInputRef.current.files
    for(let i =0; i < files.length; i++){
      formData.append('photos', files[i])
    }

    http.post(uploadAddress, formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    .then(data=>{
      console.log('data', data);
      let imgList = data.imgList
      imgList = imgList.map(item=>{
        return baseUrl + '/images/moment/' + item
      })
      let list = uploadImageList.list
      list = [...list, ...imgList]
      console.log(list);
      setUploadImageList({
        list: list
      })
    })
  }


  return (
    <div className={classes.box}>
      <header className={classes.header}>
        <CloseCircleOutlined className={classes.iconStyle} onClick={goBack}/>
        <span onClick={publish}>发布</span>
      </header>
      <main className={classes.main}>
        <header className={classes.userInfo}>
          <Avatar src={headIcon}></Avatar>
          <span>{username}</span>
        </header>        
        <div className={classes.form}>
          <TextArea autoSize ref={inputRef} placeholder='动态内容'/>
        </div>
        <div className={classes.photos}>
          {
            uploadImageList.list.map((item,index)=>{
              return <img key={index} src={item}/>
            })
          }
          {
            <a>
              <PlusOutlined className={classes.iconStyle}></PlusOutlined>
              <input type="file" multiple name='photos' ref={fileInputRef} onChange={handleInputChange}/>
            </a>
          }
        </div>
      </main>
      <TokenTest></TokenTest>
    </div>
  )
}