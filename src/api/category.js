import request from '@/utils/request'

export function addCategory(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data
  })
}