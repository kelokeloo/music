import classes from './index.module.scss'

import { CloseCircleOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Card, Avatar, Input, Form, Upload, Modal,Button   } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Meta } = Card;
import { useRef, useEffect, useState } from 'react'

import { useNavigate } from 'react-router';

import { TokenTest } from '../../../components/common/tokenTest'
import { baseUrl } from '../../../global.conf'

import http from '../../../Api/common/http'





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
    
    // 存放value值
    console.log(content);
    
    
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
          <input type="file" multiple name='photos' ref={fileInputRef} onChange={handleInputChange}/>
        </div>
        <div>
          {
            uploadImageList.list.map((item,index)=>{
              return <img key={index} src={item}/>
            })
          }
        </div>
      </main>
      <TokenTest></TokenTest>
    </div>
  )
}