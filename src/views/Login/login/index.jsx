import classes from './index.module.scss'

import { Form, Input, Button, Checkbox, message } from 'antd';

import { Link } from 'react-router-dom';

import { login } from '../../../Api/common/load';

import { useNavigate } from 'react-router';
import { baseUrl } from '../../../global.conf';






export function Login(props){
  const { setLogin } = props
  const navigateTo = useNavigate()

  const onFinish = async (values, callback) => {
    // 发起登录请求
    const data = await login({...values})
    console.log(data);
    // 登录成功
    if(data.code === 200){
      message.success('登录成功')
      console.log('user login info', data.data);
      // 保存token
      const token = data.data.token
      window.sessionStorage.setItem('token', token)
      // 保存用户信息
      window.sessionStorage.setItem('userid', data.data.userID)
      window.sessionStorage.setItem('headIcon', baseUrl + data.data.headIcon)
      window.sessionStorage.setItem('username', data.data.username)
  
      // 登录成功之后创建socket连接
      // createSocket()
      setLogin(true)
      // 跳转到首页
      callback('/')
      return true
    }
    else {
      message.error('登录失败,请检查账号密码')
      return false
    }
  
  
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className={classes.box}>
      <div className={classes.form}>
      <Form
        name="loginForm"
        initialValues={{
          remember: true,
        }}
        onFinish={(values)=>{onFinish(values, navigateTo)}}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2>登录</h2>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button className={classes.btn} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      </div>
      <div className={classes.options}>
        <p><Link className={classes.linkStyle} to="/login/forget">忘记密码</Link></p>
        <p><Link className={classes.linkStyle} to="/login/create">创建账号</Link></p>
      </div>
    </div>
  )
}