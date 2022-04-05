import { Skeleton, Switch, Card, Avatar } from 'antd';
const { Meta } = Card;

import { useState } from 'react'

import classes from './index.module.scss'

import { CommentOutlined, HeartOutlined} from '@ant-design/icons'

export function MomentCard(props){
  const [loading, setLoading] = useState(false)
 
  const onChange = checked => {
    setLoading(true)
  };
  
  const imgList1 = ['/img/1.jpg']
  const imgList2 = ['/img/1.jpg', '/img/2.jpg']
  const imgList3 = ['/img/1.jpg', '/img/2.jpg', '/img/3.jpg','/img/1.jpg', '/img/2.jpg']

  function Description(props) {
    let { imgList } = props
    imgList = imgList??{
      length: 0
    }
    function imgStyleSwitcher(imgNum){
      switch (imgNum) {
        case 1:
          return classes.listStyle1
        case 2: 
          return classes.listStyle2
        default:
          return classes.listStyle3
      }
    }
    return (
      <div className={classes.description}>
        <p>gasdfasdfsfsdfg</p>
        <div className={imgStyleSwitcher(imgList.length)}>
          {imgList.map((item,index)=><div key={index}><img src={item}></img></div>)}
        </div>
        <div className={classes.Options}>
          <span>
            <CommentOutlined /> <span>{34}</span>
          </span>
          <span>
            <HeartOutlined /> <span>{88}</span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Card style={{ marginTop: 16 }} loading={loading}>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          // description="This is the descriptionThis is the descriptionThis is the descriptionThis is the description"
          description={<Description imgList={imgList1}></Description>}
        />
      </Card>
      <Card style={{ marginTop: 16 }} loading={loading}>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          // description="This is the descriptionThis is the descriptionThis is the descriptionThis is the description"
          description={<Description imgList={imgList2}></Description>}
        />
      </Card>
      <Card style={{ marginTop: 16 }} loading={loading}>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          // description="This is the descriptionThis is the descriptionThis is the descriptionThis is the description"
          description={<Description imgList={imgList3}></Description>}
        />
      </Card>
      <Card style={{ marginTop: 16 }} loading={loading}>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          // description="This is the descriptionThis is the descriptionThis is the descriptionThis is the description"
          description={<Description imgList={[]}></Description>}
        />
      </Card>
    </div>
  )
}