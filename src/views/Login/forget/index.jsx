import classes from './index.module.scss'

import { Form, Input, Button, Checkbox } from 'antd';

import { Link } from 'react-router-dom';


const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export function Forget(props){
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
        <h2>忘记密码</h2>
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

        <Form.Item>
          <Button className={classes.btn} type="primary" htmlType="submit">
            下一步
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