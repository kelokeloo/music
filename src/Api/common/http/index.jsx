import axios from 'axios'

const http = axios.create({
  timeout: 3000
})

// 请求拦截
http.interceptors.request.use(config=>{
  if (window.sessionStorage.token) { //判断token是否存在
    config.headers.Authorization = window.sessionStorage.getItem('token');  //将token设置成请求头
    config.headers.userid = window.sessionStorage.getItem('userid');
  }
  return config
}, (err)=>{
  return Promise.reject(err)
})

// 响应拦截
// 1. 对数据进行解包

http.interceptors.response.use(({data})=>{
  
  return Promise.resolve(data)
}, err=>{
  return Promise.reject(err)
})

export default http


