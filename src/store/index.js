import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';
import { verifyToken } from '../helpers/jwt';

Vue.use(Vuex)

const baseUrl = 'http://34.87.107.88';

export default new Vuex.Store({
  state: {
    isLogin: !!localStorage.getItem('token'),
    tukangs: []
  },
  mutations: {
    SET_LOGIN (state, data) {
      state.isLogin = data
    },
    SET_TUKANGS (state, data) {
      state.tukangs = data
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: `${baseUrl}/user/login`,
        data: payload
      })
        .then(({ data }) => {
          const user = verifyToken(data.token)
          // console.log(user)
          context.commit('SET_LOGIN', data.token)
          localStorage.setItem('token', data.token)
          if (data.isOwner) {
            router.push('/dashboard')
          }
        })
        .catch(console.log)
    },
    fetchTukangs (context, payload) {
      axios({
        method: 'GET',
        url: `${baseUrl}/user/`
      })
        .then(({ data }) => {
          context.commit('SET_TUKANGS', data)
        })
        .catch(console.log)
    }
  },
  modules: {}
})
