import {
  SearchOutlined
} from '@ant-design/icons';

import classes from './index.module.scss'

// like 
import { Like } from '../../../components/home/like'
// recent
import { Recent } from '../../../components/home/recent'
// range
import { Range } from '../../../components/home/range'
// token
import { TokenTest } from '../../../components/common/tokenTest'
// navigate
import { useNavigate } from 'react-router';






export function Home(props){
  const { loadMusic } = props
  const layout = {
    style: {
      fontSize: '1.6rem',
    }
  }

  const navigateTo = useNavigate()
  // 跳转到搜索页面
  function handleSearchClick(){
    navigateTo('/search')
  }

  return (
    <div className={classes.homeBox}>
      <header className={classes.homeHeader}>
        <SearchOutlined className={classes.antIconStyle} onClick={handleSearchClick}/>
      </header>
      <header className={classes.contentHeader}>
        <h1>现在就听</h1>
      </header>
      <div className='like'>
        <Like loadMusic={loadMusic}></Like>
      </div>
      <div className={classes.recent}>
        <Recent></Recent>
      </div>
      <div className={classes.range}>
        <Range loadMusic={loadMusic}></Range>
      </div>
      <TokenTest></TokenTest>
    </div>
  )
}