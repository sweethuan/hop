import axios from 'axios'

// axios.create 方法：复制一个 axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://localhost:3000',
})

// 添加请求拦截器
request.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  // console.log('response', response)
  if(response.status !== 200) {
    return Promise.reject('发生了错误i');
  }
  return response;
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})

// console.log('typeof:', request)

export default request
