import classes from './index.module.scss'

import { CloseCircleOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Card, Avatar, Input, Form } from 'antd';
const { TextArea } = Input;
const { Meta } = Card;
import { useRef, useEffect } from 'react'

import { useNavigate } from 'react-router';

import { TokenTest } from '../../../components/common/tokenTest'

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
      </main>
      <TokenTest></TokenTest>
    </div>
  )
}