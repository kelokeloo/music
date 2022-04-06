import {
  SmileOutlined
} from '@ant-design/icons';

import classes from './index.module.scss'

// like 
import { Like } from '../../../components/home/like'
// recent
import { Recent } from '../../../components/home/recent'
// range
import { Range } from '../../../components/home/range'


export function Home(props){
  const { loadMusic } = props
  const layout = {
    style: {
      fontSize: '1.6rem',
    }
  }

  return (
    <div className={classes.homeBox}>
      <header className={classes.homeHeader}>
        <SmileOutlined className={classes.antIconStyle} />
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
        <Range></Range>
      </div>
    </div>
  )
}