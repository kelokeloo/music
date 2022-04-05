import classes from './index.module.scss'

export function Play(){
  return (
    <div className={classes.iconStyle}>
      <svg class={classes.icon} aria-hidden="true">
        <use xlinkHref="#icon-play"></use>
      </svg>
    </div>    
  )
}