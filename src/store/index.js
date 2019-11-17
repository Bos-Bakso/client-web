import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import {verifyToken} from "../helpers/jwt"


Vue.use(Vuex)

const baseUrl = 'http://34.87.107.88';

export default new Vuex.Store({
  state: {
    isLogin: (localStorage.getItem('token') ? true : false),
    listAbangBakso: [],
    tukangs: [],
    imageBos: null,
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
    SET_BOS_IMAGE(state, data) {
      state.imageBos = data
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {

        axios({
          method: 'POST',
          url: `${baseUrl}/user/login`,
          data: payload
        })
          .then(({ data }) => {
            const user = verifyToken(data.token)

            context.commit('SET_LOGIN', data.token)
            localStorage.setItem('token', data.token)

            if (data.isOwner) {
              router.push('/dashboard')
            }
            resolve(user)
          })
          .catch(console.log)
      })
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
      axios({
        method: 'POST',
        url: `${baseUrl}/user/add/`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(_ => {
        
      })
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
    },
  },
  modules: {}
})
