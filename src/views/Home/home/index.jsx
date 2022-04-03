import {
  SmileOutlined
} from '@ant-design/icons';

import classes from './index.module.scss'

export function Home(){

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
      
    </div>
  )
}