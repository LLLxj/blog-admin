/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {}

  // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = 'http://admin.school.heigrace.com/api'
  // window.SITE_CONFIG['baseUrl'] = 'http://120.78.143.29:8080/'
  window.SITE_CONFIG['baseUrl'] = 'http://112.74.162.61:5000'
  // window.SITE_CONFIG['baseUrl'] = 'http://192.168.1.26:8080'
  // window.SITE_CONFIG['baseUrl'] = 'http://localhost:8080'


  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './' // 域名
  window.SITE_CONFIG['version'] = ''   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})()
