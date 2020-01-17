import request from '@/utils/request'

const baseUrl = '/apiPro'

class Article {
  static list(query) {
    return request({
      url: `${baseUrl}/article/list`,
      method: 'get',
      params: query
    })
  }

  static info(data) {
    return request({
      url: `${baseUrl}/article/info/` + data,
      method: 'get'
    })
  }

  static save(data) {
    return request({
      url: `${baseUrl}/article/save`,
      method: 'post',
      data
    })
  }

  static update(data) {
    return request({
      url: `${baseUrl}/article/update`,
      method: 'put',
      data
    })
  }

  static delete(data) {
    return request({
      url: `${baseUrl}/article/delete/` + data,
      method: 'delete'
    })
  }
}

export default Article

