import axios from 'axios'

const http = axios.create({
  timeout: 3000
})

// 请求拦截
http.interceptors.request.use(config=>{
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


