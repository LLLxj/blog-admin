import Mock from 'mockjs'
import loginAPI from './login'
import projectAPI from './project'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/oauth\/token/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info/, 'get', loginAPI.getUserInfo)

// 项目管理相关
Mock.mock(/\/api\/project\/index/, 'get', projectAPI.getProject)
Mock.mock(/\/api\/project\/delete\/*/, 'get', projectAPI.delProject)

export default Mock
