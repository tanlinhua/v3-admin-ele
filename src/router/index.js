import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true,
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    meta: {
      roles: ['1'],
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'dashboard',
          roles: ['1'],
        },
      },
    ],
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/adm',
    name: 'Permission',
    alwaysShow: true,
    meta: {
      title: 'Permission',
      icon: 'permission',
      roles: ['7'],
    },
    children: [
      {
        path: 'adm',
        component: () => import('@/views/permission/adm.vue'),
        name: 'PermissionAdm',
        meta: {
          title: 'Adm Permission',
          roles: ['8'],
          cachePage: true,
        },
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'PermissionRole',
        meta: {
          title: 'Role Permission',
          roles: ['13'],
          cachePage: true,
        },
      },
      {
        path: 'per',
        component: () => import('@/views/permission/per.vue'),
        name: 'PermissionPer',
        meta: {
          title: 'Per Permission',
          roles: ['18'],
          cachePage: true,
        },
      },
    ],
  },
  {
    path: '/configure',
    component: Layout,
    redirect: '/configure/params',
    alwaysShow: true,
    name: 'Configure',
    meta: {
      title: 'Configure',
      icon: 'set',
      roles: ['20'],
    },
    children: [
      {
        path: 'params',
        component: () => import('@/views/configure/params.vue'),
        name: 'ConfigureParams',
        meta: {
          title: 'Params Configure',
          roles: ['21'],
          cachePage: true,
        },
      },
      {
        path: 'log',
        component: () => import('@/views/configure/log.vue'),
        name: 'ConfigureLog',
        meta: {
          title: 'Log Configure',
          roles: ['26'],
          cachePage: true,
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
})

export default router
