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
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
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
  // {
  //   path: '/project',
  //   component: Layout,
  //   redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
  //   name: 'Project',
  //   meta: {
  //     title: '项目管理',
  //     icon: 'project',
  //     roles: ['supadmin', 'admin']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'projectList',
  //       component: () => import('@/views/project/index'),
  //       meta: { title: '项目列表' }
  //     },
  //     {
  //       path: 'add',
  //       name: 'addProject',
  //       component: () => import('@/views/project/add'),
  //       meta: { title: '新增项目列表' }
  //     },
  //     {
  //       path: 'edit',
  //       name: 'editProject',
  //       hidden: true,
  //       component: () => import('@/views/project/add'),
  //       meta: { title: '编辑项目列表' }
  //     }
  //   ]
  // },
  // {
  //   path: '/git',
  //   component: Layout,
  //   redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
  //   name: 'Git',
  //   meta: {
  //     title: 'git仓库管理',
  //     icon: 'GitHub',
  //     roles: ['supadmin', 'admin']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'gitList',
  //       component: () => import('@/views/git/index'),
  //       meta: { title: '仓库列表' }
  //     },
  //     {
  //       path: 'add',
  //       name: 'addGit',
  //       component: () => import('@/views/git/add'),
  //       meta: { title: '新增仓库' }
  //     },
  //     {
  //       path: 'edit',
  //       name: 'editGit',
  //       hidden: true,
  //       component: () => import('@/views/git/add'),
  //       meta: { title: '编辑仓库' }
  //     }
  //   ]
  // },
  // {
  //   path: '/platform',
  //   component: Layout,
  //   redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
  //   name: 'Platform',
  //   meta: {
  //     title: '平台管理',
  //     icon: 'platform',
  //     roles: ['supadmin', 'admin']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'platformList',
  //       component: () => import('@/views/platform/index'),
  //       meta: { title: '平台列表' }
  //     },
  //     {
  //       path: 'add',
  //       name: 'addPlatform',
  //       component: () => import('@/views/platform/add'),
  //       meta: { title: '新增平台' }
  //     },
  //     {
  //       path: 'edit',
  //       name: 'editPlatform',
  //       hidden: true,
  //       component: () => import('@/views/platform/add'),
  //       meta: { title: '编辑平台' }
  //     }
  //   ]
  // },
  // {
  //   path: '/company',
  //   component: Layout,
  //   redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
  //   name: 'Company',
  //   meta: {
  //     title: '公司管理',
  //     icon: 'company',
  //     roles: ['supadmin', 'admin']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'companyList',
  //       component: () => import('@/views/company/index'),
  //       meta: { title: '公司列表' }
  //     },
  //     {
  //       path: 'add',
  //       name: 'addCompany',
  //       component: () => import('@/views/company/add'),
  //       meta: { title: '新增公司' }
  //     },
  //     {
  //       path: 'edit',
  //       name: 'editCompany',
  //       hidden: true,
  //       component: () => import('@/views/company/add'),
  //       meta: { title: '编辑公司' }
  //     }
  //   ]
  // },
  // {
  //   path: '/figure',
  //   component: Layout,
  //   redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
  //   name: 'Figure',
  //   meta: {
  //     title: '白皮书',
  //     icon: 'figure',
  //     roles: ['supadmin', 'admin']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'figureList',
  //       component: () => import('@/views/figure/index'),
  //       meta: { title: '白皮书列表' }
  //     },
  //     {
  //       path: 'add',
  //       name: 'addFigure',
  //       component: () => import('@/views/figure/add'),
  //       meta: { title: '新增白皮书' }
  //     },
  //     {
  //       path: 'edit',
  //       name: 'editFigure',
  //       hidden: true,
  //       component: () => import('@/views/figure/add'),
  //       meta: { title: '编辑白皮书' }
  //     }
  //   ]
  // },
  // {
  //   path: '/cms',
  //   component: Layout,
  //   redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
  //   name: 'CMS',
  //   meta: {
  //     title: 'CMS系统',
  //     icon: 'cms',
  //     roles: ['supadmin', 'admin']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'cmsList',
  //       component: () => import('@/views/cms/index'),
  //       meta: { title: '发布列表' }
  //     },
  //     {
  //       path: 'add',
  //       name: 'addCms',
  //       component: () => import('@/views/cms/add'),
  //       meta: { title: '新增发布' }
  //     },
  //     {
  //       path: 'edit',
  //       name: 'editCms',
  //       hidden: true,
  //       component: () => import('@/views/cms/add'),
  //       meta: { title: '编辑发布' }
  //     }
  //   ]
  // },
  {
    path: '/category',
    component: Layout,
    redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    name: 'Category',
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
  // {
  //   path: '/tags',
  //   component: Layout,
  //   redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
  //   name: 'Tags',
  //   meta: {
  //     title: '标签管理',
  //     icon: 'tags',
  //     roles: ['supadmin', 'admin']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'tagsList',
  //       component: () => import('@/views/tags/index'),
  //       meta: { title: '标签列表' }
  //     },
  //     {
  //       path: 'add',
  //       name: 'addTags',
  //       component: () => import('@/views/tags/add'),
  //       meta: { title: '新增标签' }
  //     },
  //     {
  //       path: 'edit',
  //       name: 'editTags',
  //       hidden: true,
  //       component: () => import('@/views/tags/add'),
  //       meta: { title: '编辑标签' }
  //     }
  //   ]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   meta: {
  //     roles: ['supadmin', 'admin']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'testForm',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '测试缓存tabs', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/article',
    component: Layout,
    redirect: 'noredirect', // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    name: 'aiticle',
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
]
// 临时处理路由权限 全部可以访问
const allRoyterMap = constantRouterMap.concat(asyncRouterMap)
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: allRoyterMap
})

