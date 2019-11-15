import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const baseUrl = "http://localhost:3000"

export default new Vuex.Store({
 state: {
   isLogin: (localStorage.getItem('token') ? true : false)
 },
 mutations: {
   SET_LOGIN(state, data) {
     state.isLogin = data
   }
 },
 actions: {
   login(context, payload) {
      axios({
        method: 'GET',
        url: `${baseUrl}/user`
      })
      .then(({data}) => {
        console.log(data)
        context.commit('SET_LOGIN', data[0].id)
        localStorage.setItem('id', data[0].id)
        localStorage.setItem('token', data[0].id)
        router.push('/dashboard')
      })
      .catch(console.log)
   }
 },
 modules: {
 }
})