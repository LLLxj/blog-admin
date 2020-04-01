import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', name: 'login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      meta: {
        title: '首页',
        icon: 'table'
      },
      component: () => import('@/views/dashboard/index')
    }]
  }

  // { path: '*', redirect: '/404', hidden: true }
]

const asyncRouterMap = [
  {
    path: '/config',
    component: Layout,
    redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    name: 'config',
    meta: {
      title: '站点设置',
      icon: 'category',
    },
    children: [
      {
        path: 'list',
        name: 'setting',
        component: () => import('@/views/config/index'),
        meta: { title: '站点设置' }
      },
      {
        path: 'info',
        name: 'info',
        component: () => import('@/views/config/info'),
        meta: { title: '个人中心' }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'project'
    },
    children: [
      {
        path: 'list',
        name: 'userList',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表' }
      },
      {
        path: 'add',
        name: 'addUser',
        component: () => import('@/views/user/add'),
        meta: { title: '新增用户' }
      },
      {
        path: 'edit',
        name: 'editUser',
        hidden: true,
        component: () => import('@/views/user/add'),
        meta: { title: '编辑用户' }
      }
    ]
  },
  {
    path: '/column',
    component: Layout,
    redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    name: 'column',
    meta: {
      title: '栏目管理',
      icon: 'cms',
    },
    children: [
      {
        path: 'list',
        name: 'columnList',
        component: () => import('@/views/column/index'),
        meta: { title: '栏目列表' }
      },
      {
        path: 'add',
        name: 'addColumn',
        component: () => import('@/views/column/add'),
        meta: { title: '新增栏目' }
      },
      {
        path: 'edit',
        name: 'editColumn',
        hidden: true,
        component: () => import('@/views/column/add'),
        meta: { title: '编辑栏目' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    name: 'category',
    meta: {
      title: '分类管理',
      icon: 'category',
      roles: ['supadmin', 'admin']
    },
    children: [
      {
        path: 'list',
        name: 'categoryList',
        component: () => import('@/views/category/index'),
        meta: { title: '分类列表' }
      },
      {
        path: 'add',
        name: 'addCategory',
        component: () => import('@/views/category/add'),
        meta: { title: '新增分类' }
      },
      {
        path: 'edit',
        name: 'editCategory',
        hidden: true,
        component: () => import('@/views/category/add'),
        meta: { title: '编辑分类' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    name: 'article',
    meta: {
      title: '文章管理',
      icon: 'cms',
    },
    children: [
      {
        path: 'list',
        name: 'articleList',
        component: () => import('@/views/article/index'),
        meta: { title: '文章列表' }
      },
      {
        path: 'add',
        name: 'addArticle',
        component: () => import('@/views/article/add'),
        meta: { title: '新增文章' }
      },
      {
        path: 'edit',
        name: 'editArticle',
        hidden: true,
        component: () => import('@/views/article/add'),
        meta: { title: '编辑文章' }
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    name: 'activity',
    meta: {
      title: '活动管理',
      icon: 'category',
    },
    children: [
      {
        path: 'list',
        name: 'activityList',
        component: () => import('@/views/activity/index'),
        meta: { title: '活动列表', icon: 'cms', }
      },
      {
        path: 'add',
        name: 'addActivity',
        component: () => import('@/views/activity/add'),
        meta: { title: '新增活动', icon: 'cms', }
      },
      {
        path: 'edit',
        name: 'editActivity',
        hidden: true,
        component: () => import('@/views/activity/add'),
        meta: { title: '编辑活动', icon: 'cms', }
      },
    ]
  },
]
// 临时处理路由权限 全部可以访问
const allRoyterMap = constantRouterMap.concat(asyncRouterMap)
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: allRoyterMap
})

