import request from '../http/index.js'

// 获取所有用户
export function getuser () {
  return request({
    method: 'GET',
    url: '/user',
  })
}