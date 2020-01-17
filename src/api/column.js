import request from '@/utils/request'

const baseUrl = '/apiPro'

class Column {
  static list(query) {
    return request({
      url: `${baseUrl}/column/list`,
      method: 'get',
      params: query
    })
  }

  static info(data) {
    return request({
      url: `${baseUrl}/column/info/` + data,
      method: 'get'
    })
  }

  static save(data) {
    return request({
      url: `${baseUrl}/column/save`,
      method: 'post',
      data
    })
  }

  static update(data) {
    return request({
      url: `${baseUrl}/column/update`,
      method: 'put',
      data
    })
  }

  static delete(data) {
    return request({
      url: `${baseUrl}/column/delete/` + data,
      method: 'delete'
    })
  }
}

export default Column

