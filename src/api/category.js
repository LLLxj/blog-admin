import request from '@/utils/request'

const baseUrl = '/apiPro'

class Category {
  static list(query) {
    return request({
      url: `${baseUrl}/category/list`,
      method: 'get',
      params: query
    })
  }

  static info(data) {
    return request({
      url: `${baseUrl}/category/info/` + data,
      method: 'get'
    })
  }

  static checkName(name) {
    return request({
      url: `${baseUrl}/category/checkName`,
      method: 'get',
      params: { name }
    })
  }

  static save(data) {
    return request({
      url: `${baseUrl}/category/save`,
      method: 'post',
      data
    })
  }

  static update(data) {
    return request({
      url: `${baseUrl}/category/update`,
      method: 'put',
      data
    })
  }

  static delete(data) {
    return request({
      url: `${baseUrl}/category/delete/` + data,
      method: 'delete'
    })
  }
}

export default Category

