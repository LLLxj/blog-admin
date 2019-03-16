/**
 * Created by xxh on 2018年08月13日.
 */

/**
 * console.log 开关
 */

export default function install(Vue, options) {
  Vue.prototype.xlog = function(str) {
    if (process.env.NODE_ENV === 'development') {
      console.log(str)
    } else {
      // nothing
    }
  }
}
