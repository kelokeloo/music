import { Header } from  '../../../components/common/header'
import classes from './index.module.scss'
import { Form, Input, Button, message } from 'antd'
import { setPassword } from '../../../Api/common/load'
import { useNavigate } from 'react-router-dom'
export function SetPassword(){
  const navigateTo = useNavigate()

  const onFinish = (values) => {
    const { password, newPassword} = values
    setPassword(password,newPassword)
    .then(res=>{
      console.log(res);
      if(res.code === -1){
        message.error('更新失败')
      }
      else {
        message.success('更新成功')
        navigateTo(-1)
      }
    })
    .catch(e=>{
      console.error(e);
      message.error('更新失败')
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Header></Header>
      <main className={classes.main}>
      <Form
        name="setPassword"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ username: window.sessionStorage.getItem('username') }}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="newPassword"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
      </main>
    </div>
  )
}