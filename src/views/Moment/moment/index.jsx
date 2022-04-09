import classes from './index.module.scss'

import { PlusCircleOutlined } from '@ant-design/icons'

import { MomentCard } from '../../../components/moment/momentItem'

import { useNavigate } from 'react-router';

import { TokenTest } from '../../../components/common/tokenTest'

export function Moment(){
  const navigateTo = useNavigate()
  function goToAddMoment(){
    navigateTo('/moment/add')
  }
  
  return (
    <div className={classes.box}>
      <header><PlusCircleOutlined className={classes.iconStyle} onClick={goToAddMoment}/></header>
      <div>
        <MomentCard></MomentCard>
      </div>
      <TokenTest></TokenTest>
    </div>
  )
}