import axios from 'axios'

// axios.create 方法：复制一个 axios
const request = axios.create({
  timeout: 60000,
  baseURL: 'http://47.119.157.48:3002',
})

// 设置请求次数，请求的间隙
request.defaults.retry = 4;
request.defaults.retryDelay = 1000

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
  return response;
}, function(error) {
  // 对响应错误做点什么
  
      // 处理超时的情况
      let config = error.config
      // If config does not exist or the retry option is not set, reject
      if(!config || !config.retry) return Promise.reject(error)
   
      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0
   
      // Check if we've maxed out the total number of retries
      if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(error)
      }
   
      // Increase the retry count
      config.__retryCount += 1
   
      // Create new promise to handle exponential backoff
      let backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve()
        }, config.retryDelay || 1)
      })
   
      // Return the promise in which recalls axios to retry the request
      return backoff.then(function() {
        return axios(config)
      })
  // return Promise.reject(error);
})

// console.log('typeof:', request)

export default request
