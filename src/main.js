import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import httpRequest from '@/utils/request'
import '@/icons' // icon
import '@/permission' // permission control
import xlog from './utils/xlog'
import './mock' // 可用于模拟数据，若有接口 则可关闭
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(ElementUI, { size: 'small' })
Vue.use(xlog)
Vue.use(VueQuillEditor)

Vue.config.productionTip = false
Vue.prototype.$http = httpRequest
// 保存整站vuex本地储存初始状态
// window.SITE_CONFIG['storeState'] = cloneDeep(store.state)
Vue.prototype.GLOBAL = {
  // 'BASE_URL_HEAD': '/apiPro',
  'BASE_URL_HEAD': process.env.NODE_ENV === 'development' ? '/apiPro' : '',
  /** 单文件上传地址 */
  'UPLOAD_URL': '/apiPro/category/uploadCategoryBac'
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
