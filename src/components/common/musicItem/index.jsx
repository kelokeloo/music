import { List, Avatar } from 'antd';

import { musicMark } from '../../../Api/common/load'

export function MusicItem(props){
  const { imgUrl, musicUrl, name, singer, loadMusic, id} = props
  function handleClick(){
    loadMusic({ musicUrl, name, singer, imgUrl })
    musicMark(id)
  }

  return (
    <List.Item.Meta
      onClick={ ()=>{handleClick()}}
      avatar={<Avatar src={imgUrl} />}
      title={name}
      description={singer}
    />
  )
}