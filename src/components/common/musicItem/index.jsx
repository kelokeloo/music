import { List, Avatar } from 'antd';

export function MusicItem(props){
  const { imgUrl, musicUrl, name, singer, loadMusic} = props
  return (
    <List.Item.Meta
      onClick={ ()=>{loadMusic({ musicUrl, name, singer, imgUrl })}}
      avatar={<Avatar src={imgUrl} />}
      title={name}
      description={singer}
    />
  )
}