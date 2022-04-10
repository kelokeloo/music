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


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



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

  

  // 表单相关
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // 图片上传
  const uploadAddress = '/api/upload'

  const fileInputRef = useRef(null)

  function handleUpload(){
    const files = fileInputRef.current.files
    const content = inputRef.current.resizableTextArea.props.value
    console.log('content', content);
    const formData = new FormData()
    // 存放value值
    formData.append('content', content)
    for(let i =0; i < files.length; i++){
      formData.append('photos', files[i])
    }
    http.post(uploadAddress, formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    .then(data=>{
      console.log(data);
    })
  }

  

  // 点击发布
  function publish(){
    console.log('发布');
    form.submit()
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
        <Form
          name="addMoment"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="content"
          >
            <TextArea autoSize ref={inputRef} placeholder='动态内容'/>
          </Form.Item>
        </Form>

        
        <input type="file" multiple name='photos' ref={fileInputRef}/>
        <Button onClick={handleUpload}>上传</Button>
        
          
      </main>
      <TokenTest></TokenTest>
    </div>
  )
}