import request from '@/utils/request'

export function categoryList(query) {
  return request({
    url: '/category/list',
    method: 'get',
    params: query
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

export function checkCategoryName(query) {
  return request({
    url: '/category/checkName',
    method: 'get',
    params: query
  })
}


export function uploadBacGround(query) {
  return request({
    url: '/uploadCategoryBac',
    method: 'post',
    params: query
  })
}


export function updateCategory(data) {
  return request({
    url: '/category/update',
    method: 'post',
    data
  })
}

export function categoryDelete(data) {
  return request({
    url: '/category/delete/' + data,
    method: 'get',
  })
}
