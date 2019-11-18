import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      beforeEnter: (to, from, next) => {
        if(store.state.isLogin) {
          next()
        }
        else next('/')
      }
    },
    {
      path: '/maps',
      name: 'maps',
      component: () => import('./views/MapsContainer.vue'),
      beforeEnter: (to, from, next) => {
        if(store.state.isLogin) {
          next()
        }
        else next('/')
      }
    },
  ]
})
