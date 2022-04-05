import classes from './index.module.scss'

import { CloseCircleOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Card, Avatar, Input } from 'antd';
const { TextArea } = Input;
const { Meta } = Card;
import { useRef, useEffect } from 'react'

import { useNavigate } from 'react-router';

export function AddMoment(props){
  const inputRef = useRef(null);
  const navigateTo = useNavigate()
  
  const imgList = ['/img/1.jpg', '/img/2.jpg']
  const content = 'asdjfisadjfo yes go good yar asdjfisadjfo yes go good yar asdjfisadjfo yes go good yar asdjfisadjfo yes go good yar '

  useEffect(() => {
    inputRef.current.focus()
  }, []);

  function goBack(){
    navigateTo(-1)
  }

  function publish(){
    console.log('发布');
  }

  function Description(){
    return (
      <div>
        <div className={classes.content}>
          <TextArea ref={inputRef} autoSize placeholder="添加评论">{content}</TextArea>
        </div>
        <div className={classes.description}>
          {imgList.map((item, index)=>{
            return (
              <div key={index}>
                <img src={item}/>
              </div>
            )
          })}
          {<div className={classes.addImg}><PlusSquareOutlined className={classes.iconStyle}/></div>}
        </div>
      </div>
      
    )
  }

  return (
    <div className={classes.box}>
      <header className={classes.header}>
        <CloseCircleOutlined className={classes.iconStyle} onClick={goBack}/>
        <span onClick={publish}>发布</span>
      </header>
      <main>
        <Card>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            description={Description()}
          />
        </Card>
      </main>
    </div>
  )
}