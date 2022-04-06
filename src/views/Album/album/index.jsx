export function Album(props){
  let { id } = props
  id = id??-1
  return (
    <div>album id is {id}</div>
  )
}