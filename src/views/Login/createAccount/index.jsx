import classes from './index.module.scss'

import { Form, Input, Button, Checkbox } from 'antd';

import { Link } from 'react-router-dom';


const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export function CreateAccount(props){
  return (
    <div className={classes.box}>
      <div className={classes.form}>
      <Form
        name="loginForm"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2>注册</h2>
        <Form.Item
          label="用户名"
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
          label="密码"
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

        <Form.Item
          label="确认密码"
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
            注册
          </Button>
        </Form.Item>
      </Form>
      </div>
      <div className={classes.options}>
        <p><Link className={classes.linkStyle} to="/login">登录</Link></p>
      </div>
    </div>
  )
}