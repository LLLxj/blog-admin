import request from '@/utils/request'

export function categoryList(query) {
  return request({
    url: '/category/list',
    method: 'get',
    query
  })
}

export function addCategory(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data
  })
}