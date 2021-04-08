import request from '../http/index.js'

// 获取所有用户
export function getuser () {
  return request({
    method: 'GET',
    url: '/user',
  })
}

// 上传文件
export function uploadFile (data) {
  return request({
    method: 'POST',
    url: '/upload',
    data
  })
}
// 获取用户
export function getUserByid () {
  return request({
    method: 'GET',
    url: '/user'
  })
}