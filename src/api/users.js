import request from '@/utils/request'

export function usersList(query) {
  return request({
    url: '/users/list',
    method: 'get',
    params: query
  })
}

export function usersInfo(data) {
  return request({
    url: '/users/info/' + data,
    method: 'get',
  })
}

export function usersSave(data) {
  return request({
    url: '/users/save',
    method: 'post',
    data
  })
}

export function usersUpdate(data) {
  return request({
    url: '/users/update',
    method: 'post',
    data
  })
}

export function usersDelete(data) {
  return request({
    url: '/users/delete/' + data,
    method: 'get',
  })
}