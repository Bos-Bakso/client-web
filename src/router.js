import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/dashboard',
      name: 'about',
      component: () => import('./views/Dashboard.vue'),
      beforeEnter: (to, from, next) => {
        if(store.state.isLogin) {
          store.commit('SET_HEADER_TITLE', 'Dashboard')
          next()
        }
        else next('/')
      }
    },
    {
      path: '/add',
      name: 'about',
      component: () => import('./views/AddAbang.vue'),
      beforeEnter: (to, from, next) => {
        if(store.state.isLogin) {
          store.commit('SET_HEADER_TITLE', 'Add Abang')
          next()
        }
        else next('/')
      }
    },
  ]
})
