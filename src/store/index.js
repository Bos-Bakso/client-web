import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import {verifyToken} from "../helpers/jwt"


Vue.use(Vuex)

const baseUrl = 'http://35.185.180.235';

export default new Vuex.Store({
  state: {
    isLogin: (localStorage.getItem('token') ? true : false),
    listAbangBakso: [],
    tukangs: [],
    imageBos: null,
    rankAbang: [],
    service: [],
    abangService: []
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
    },
    SET_RANK_ABANG(state, data) {
      state.rankAbang = data
    },
    SET_SERVICE(state, data){
      state.service = data
    },
    SET_ABANG_SERVICE(state, data){
      state.abangService = data
    }
  },
  actions: {
    login(context, payload) {
      console.log('halos')
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
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `${baseUrl}/user/add/`,
          data: payload,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(_ => {
          resolve()
        })
        .catch(console.log)
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
    fetchRank(context, payload) {
      axios({
        method: 'GET',
        url: `${baseUrl}/rank`,
      })
      .then(({data}) => {
        console.log(data.rank.rank)
        context.commit('SET_RANK_ABANG', data.rank.rank)
      })
      .catch(console.log)
    },
    fetchService(context, payload){
      return new Promise(function(resolve,reject){
        axios({
          method: 'GET',
          url : `${baseUrl}/service`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data})=> {
          context.commit('SET_SERVICE', data.service)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    fetchAbangService(context, payload){
      axios({
        method: 'GET',
        url : `${baseUrl}/user`
      })
      .then(({data}) => {
        const abangService = data.filter(abangs => {
          return abangs.role === 'service'
        })
        context.commit('SET_ABANG_SERVICE', abangService)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    addAbangService(context, payload){
      return new Promise(function(resolve,reject){
        axios({
          method: "POST",
          url : `${baseUrl}/user/add`,
          headers: {
            token : localStorage.getItem('token')
          },
          data: payload
        })
        .then(({data}) => {
          console.log(data)
          resolve()
        })
        .catch(err=>{ 
          reject(err)
        })
      })
    }
  },
  modules: {}
})
