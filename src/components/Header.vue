<template>
  <div class="header">
    <div class="info">
      <div class="title-header">
        <img src="../../assets/bowl.png" alt style="width: 60px; height: 100%; margin-right: 20px;" />
        <h4 class="main-title">BosBaso</h4>
      </div>
      <div class="user-info">
        <div class="user-icon" style="margin-left: 50px;">
          <img :src="this.$store.state.imageBos || imageBos" alt id="imgBos" v-popover:logout />
        </div>
       
       <div class="btn">
          <router-link to="/service">Request Service  <span v-if="showNotif" class="badge badge-danger badge-lg" style="font-size: 15px;"> {{notifCount}}</span></router-link>
        </div>

        <div class="btn">
          <router-link to="/maps">Maps</router-link>
        </div>
        <div class="btn">
          <router-link to="/dashboard">Dashboard</router-link>
        </div>
      </div>
    </div>
    <popover name="logout" class="btn">
      <router-link to="/">Logout</router-link>
    </popover>
  </div>
</template>

<script>
import { Push } from "vue-burger-menu";
import { verifyToken } from "../helpers/jwt";
import {TriggerNotif} from "@/api/firebase"

export default {
  props: ["titleCard"],
  data: function() {
    return {
      imageBos: null,
      notifCount: -1,
      showNotif: false
    };
  },
  components: { },
  methods: {
    logout() {
      console.log("HALO");
      localStorage.removeItem("token");
      this.$store.commit("SET_LOGIN", false);
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      const user = verifyToken(localStorage.getItem("token"));
      this.imageBos = user.image;
    }


    TriggerNotif
      .onSnapshot((querySnapshot) => {  
         
      })

  }
};
</script>

<style>
.header {
  height: 7vh;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
}

.info {
  height: 7vh;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 23rem;
}

.title-header {
  display: flex;
  align-items: center;
}

h4.main-title {
  font-size: 2rem;
}

.user-info {
  width: 50%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: right;
  align-items: center;
}

.welcome {
  height: 7vh;
  padding: 20px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  font-size: 2rem !important;
}

#imgBos {
  border-radius: 50%;
  width: 60px;
  height: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
}

#imgBos:hover {
  cursor: pointer;
}

/* div[data-popover="logout"] {
  background: #444;
  color: #f9f9f9;

  font-size: 12px;
  line-height: 1.5;
  margin: 5px;
} */
</style>
