import request from '@/utils/request'

// 加载  部门树
export function reqDeptTree(data) {
  return request({
    url: '/sys/dept/tree',
    method: 'get'
  })
}
// 管理员加载  部门
export function reqsysDeptTree(data) {
  return request({
    url: '/sys/dept/deptTree',
    method: 'get',
    params: data
  })
}
// 加载  部门选择
export function reqDeptSelect(data) {
  return request({
    url: '/sys/dept/deptTree',
    method: 'get',
    params: data
  })
}
//   部门分页查询
export function reqDeptListPage(data) {
  return request({
    url: '/sys/dept/listPage',
    method: 'get',
    params: data
  })
}
// 添加  部门
export function reqDeptSave(data) {
  return request({
    url: '/sys/dept',
    method: 'post',
    data
  })
}
export function reqDeptInfo(data) {
  return request({
    url: '/sys/dept/' + data,
    method: 'get'
  })
}
export function reqDeptUpdate(data) {
  return request({
    url: '/sys/dept',
    method: 'put',
    params: data
  })
}
export function reqDeptDelete(data) {
  return request({
    url: '/sys/dept/' + data,
    method: 'post'
  })
}
