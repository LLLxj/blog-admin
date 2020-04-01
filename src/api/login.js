import request from '@/utils/request'

const baseUrl = '/apiPro'

class System {
  static login(data) {
    return request({
      url: `${baseUrl}/sys/login`,
      // url: `${baseUrl}/login`,
      method: 'post',
      data
    })
  }

  static info(data) {
    return request({
      url: `${baseUrl}/sys/info/` + data,
      method: 'get'
    })
  }

  static logout() {
    return request({
      url: `${baseUrl}/sys/logout`,
      method: 'post'
    })
  }
}

export default System
