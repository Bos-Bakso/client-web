<template>
  <div class="header">
    
    <div class="info">
      <div class="title-header">
        <img src="../../assets/bowl.png" alt="" style="width: 60px; height: 100%; margin-right: 20px;">
        <h4 class="main-title">BosBaso</h4>
      </div>
      <div class="user-info">
        <div class="user-icon" style="margin-left: 50px;">
            <img :src="this.$store.state.imageBos" alt="" id="imgBos">
        </div>
        <div id="notif">
          <h4>Bell</h4>
          <div>
          </div>
        </div>
      </div>
    </div>

    <div class="welcome">
      <div class="btn">
        <router-link to="/dashboard">Dashboard</router-link>
      </div>

      <div class="btn">
        <router-link to="/maps">Maps</router-link>
      </div>

      <div class="btn">
        <router-link to="/add">Add Abang</router-link>
      </div>

      <div class="btn" @click="logout()">
        <router-link to="/">Logout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Push } from "vue-burger-menu";
export default {
  props: ["titleCard"],
  components: { Push },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$store.commit('SET_LOGIN', false)
    }
  }
};
</script>

<style>
.header {
  height: 14vh;
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
  width: 30%;
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
</style>
