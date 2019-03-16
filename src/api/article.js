import request from '@/utils/request'

export function articleList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function articleInfo(query) {
  return request({
    url: '/article/info',
    method: 'get',
    params: query
  })
}

export function articleUpdate(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

