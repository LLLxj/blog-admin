import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store'
import { getToken, removeToken } from '@/utils/auth'
// import Vue from 'vue'
import router from '@/router'

// 创建axios实例
console.log(process.env)
const service = axios.create({
  // baseURL: 'http://localhost:5000',
  // baseURL: '112.74.162.61:5000',
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: process.env.BASE_URL,
  // baseURL: '127.0.0.1',
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // console.log(Vue.cookie.get('ba-token'))
  // config.headers['token'] = Vue.cookie.get('ba-token') // 请求头带上token
  // if (store.getters.token) {
  config.headers['Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

service.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return process.env.BASE_URL + actionName
}

// respone拦截器
service.interceptors.response.use(
  // response => response,
  // response => response,
  (response) => {
    /**
    * code为非20000是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res.code !== 200) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code === 5002 || res.code === 1132) {
        removeToken()
        router.push({ name: 'login' })
      }
      return response
    }
    return response
  }, error => {
    console.log('err' + error)// for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
