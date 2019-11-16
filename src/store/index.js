import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'


Vue.use(Vuex)

const baseUrl = 'http://34.87.107.88';

export default new Vuex.Store({
  state: {
    isLogin: (localStorage.getItem('token') ? true : false),
    listAbangBakso: [],
    tukangs: [],
    headerTitle: 'Dashboard'
  },
  mutations: {
    SET_LOGIN(state, data) {
      state.isLogin = data
    },
    SET_ABANG_BAKSO(state, data) {
      state.listAbangBakso = data
    },
    SET_TUKANGS(state, data) {
      state.tukangs = data
    },
    SET_HEADER_TITLE(state, data) {
      state.headerTitle = data
    }
  },
  actions: {
    login(context, payload) {
      axios({
        method: 'POST',
        url: `${baseUrl}/user/login`,
        data: payload
      })
        .then(({ data }) => {
          context.commit('SET_LOGIN', data.token)
          localStorage.setItem('token', data.token)
          if (data.isOwner) {
            router.push('/dashboard')
          }
        })
        .catch(console.log)
    },
    getTotalAbang(context, payload) {
      console.log(localStorage.getItem('token'))
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${baseUrl}/user/`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(console.log)
      })
    },
    getTransactions(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${baseUrl}/transaction/`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(console.log)
      })
    },
    addAbang(context, payload) {

    },
    fetchTukangs(context, payload) {
      axios({
        method: 'GET',
        url: `${baseUrl}/user/`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_TUKANGS', data)
          console.log('fetch')
        })
        .catch(console.log)
    }
  },
  modules: {}
})
