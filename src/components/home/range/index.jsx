import classes from './index.module.scss'
import { List, Avatar } from 'antd';

export function Range(props){
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <div className={classes.range}>
      <h2>排行榜</h2>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <span className={classes.rangeNumber}>{index + 1}</span>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design"
            />
          </List.Item>
        )}
      />
    </div>
  )
}