import request from '@/utils/request'

export function categoryList(query) {
  return request({
    url: '/category/list',
    method: 'get',
    query
  })
}

export function categoryInfo(data) {
  return request({
    url: '/category/info/' + data,
    method: 'get',
  })
}

export function addCategory(data) {
  return request({
    url: '/category/save',
    method: 'post',
    data
  })
}