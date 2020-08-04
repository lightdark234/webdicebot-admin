import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import License from '@/views/License'
import AddLicense from '@/views/License/Add'
import Price from '@/views/Price'
import AddPrice from '@/views/Price/Add'
import Ref from '@/views/Ref'
import AddRef from '@/views/Ref/Add'

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
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/license',
      name: 'License',
      component: License,
      meta: { requiresAuth: true }
    },
    {
      path: '/license/add',
      name: 'Add license',
      component: AddLicense,
      meta: { requiresAuth: true }
    },
    {
      path: '/price',
      name: 'Price',
      component: Price,
      meta: { requiresAuth: true }
    },
    {
      path: '/price/add',
      name: 'Add price',
      component: AddPrice,
      meta: { requiresAuth: true }
    },
    {
      path: '/ref',
      name: 'Ref',
      component: Ref,
      meta: { requiresAuth: true }
    },
    {
      path: '/ref/add',
      name: 'Add ref',
      component: AddRef,
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