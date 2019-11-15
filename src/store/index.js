import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import {verifyToken} from '../helpers/jwt'
import { resolve } from 'path'
import { reject } from 'q'

Vue.use(Vuex)

const baseUrl = "http://34.87.107.88"

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
        method: 'POST',
        url: `${baseUrl}/user/login`,
        data: payload
      })
      .then(({data}) => {
        context.commit('SET_LOGIN', data.token)
        localStorage.setItem('token', data.token)
        if(data.isOwner) {
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
       .then(({data})  => {
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
      .then(({data}) => {
        resolve(data)
      })
      .catch(console.log)
    })
   },
 },
 modules: {
 }
})