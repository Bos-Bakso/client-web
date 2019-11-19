const firebase = require("firebase/app")

require("firebase/firestore")



firebase.initializeApp({
  apikey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
})

const db = firebase.firestore()

module.exports = db