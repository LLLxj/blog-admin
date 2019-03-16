/**
 * 项目管理接口
 * created by xxh on 2018-10-12
 */

import request from '@/utils/request'

//  获取项目列表
export function getList(params) {
  return request({
    url: '/api/project/index',
    method: 'get',
    params: { params }
  })
}

//  获取项目列表
export function delProject(params) {
  return request({
    url: '/api/project/delete/' + params,
    method: 'get'
    // params: { params }
  })
}
