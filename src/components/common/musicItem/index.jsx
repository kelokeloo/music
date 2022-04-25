import { List, Avatar } from 'antd';
import classes from './index.module.scss'
// import { musicMark } from '../../../Api/common/load'

export function MusicItem(props){
  const { list, index, loadMusic} = props
  function handleClick(){
    loadMusic(list, index)
    // musicMark(list[index].id)
  }

  return (
    <div>
      {
        list && list.length > 0 ? (
          <div className={classes.box} onClick={ ()=>{handleClick()}}>
            <div>
              <Avatar src={list[index].imgUrl}></Avatar>
            </div>
            <div>
              <h3>{list[index].name}</h3>
              <p>{list[index].singer}</p>
            </div>
          </div>
        ): ('')
      }
    </div>
  )
}