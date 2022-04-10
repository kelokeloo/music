import { List, Avatar } from 'antd';

import { albumMark } from '../../../Api/common/load'

import { useNavigate } from 'react-router';

export function AlbumItem(props){
  const { imgUrl, title, content, id} = props

  const navigateTo = useNavigate()
  function handleClick(){
    albumMark(id)
    navigateTo(`/album/${id}`)
  }

  return (
    <List.Item.Meta
      onClick={ ()=>{handleClick()}}
      avatar={<Avatar src={imgUrl} />}
      title={title}
      description={content}
    />
  )
}