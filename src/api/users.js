import request from '@/utils/request'

const baseUrl = '/apiPro'

class Users {
  static list(query) {
    return request({
      url: `${baseUrl}/users/list`,
      method: 'get',
      params: query
    })
  }

  static info(data) {
    return request({
      url: `${baseUrl}/users/info/` + data,
      method: 'get'
    })
  }

  static save(data) {
    return request({
      url: `${baseUrl}/users/save`,
      method: 'post',
      data
    })
  }

  static update(data) {
    return request({
      url: `${baseUrl}/users/update`,
      method: 'put',
      data
    })
  }

  static delete(data) {
    return request({
      url: `${baseUrl}/users/delete/` + data,
      method: 'delete'
    })
  }
}

export default Users

