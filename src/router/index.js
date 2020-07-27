import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import AdminLicense from '@/views/License'
import AdminAddLicense from '@/views/License/Add'
import AdminPrice from '@/views/Price'
import AdminAddPrice from '@/views/Price/Add'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Admin',
      component: Admin,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/license',
      name: 'Admin license',
      component: AdminLicense,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/license/add',
      name: 'Admin Add license',
      component: AdminAddLicense,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/price',
      name: 'Admin price',
      component: AdminPrice,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/price/add',
      name: 'Admin add price',
      component: AdminAddPrice,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    !localStorage.getItem('token') ? next({ path: '/login' }) : next()
  }
  else {
    next()
  }
})

export default router