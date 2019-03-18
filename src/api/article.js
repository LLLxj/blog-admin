import request from '@/utils/request'

export function articleList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function articleInfo(data) {
  return request({
    url: '/article/info/' + data,
    method: 'get',
  })
}

export function articleSave(data) {
  return request({
    url: '/article/save',
    method: 'post',
    data
  })
}

export function articleUpdate(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function articleDelete(data) {
  return request({
    url: '/article/delete/' + data,
    method: 'get',
  })
}


