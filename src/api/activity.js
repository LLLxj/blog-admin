import request from '@/utils/request'
const baseUrl = '/apiPro'

class Activity {
  /**
   * 消息中心
   */
  // 加载消息中心列表数据
  static list(params) {
    return request({
      url: `${baseUrl}/activity/list`,
      method: 'get',
      params: params
    })
  }

  static info(data) {
    return request({
      url: `${baseUrl}/activity/info/` + data,
      method: 'get'
    })
  }

  /**
   * 预览
  */
  static preView(data) {
    return request({
      url: `${baseUrl}/activity/preView/` + data,
      method: 'get'
    })
  }

  /**
   * 下载
  */
  static upload(data) {
    return request({
      url: `${baseUrl}/activity/upload/` + data,
      method: 'get'
    })
  }

  /**
   * 新增活动
  */
  static save(data) {
    return request({
      url: `${baseUrl}/activity/save`,
      method: 'post',
      data
    })
  }

  /**
   * 更新活动
  */
  static update(data) {
    return request({
      url: `${baseUrl}/activity/update`,
      method: 'post',
      data
    })
  }
}

export default Activity
