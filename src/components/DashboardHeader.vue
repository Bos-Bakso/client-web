<template>
  <div class="header">
    <div class="info">
      <div class="title-dashboard">
        <Push class="bm">
          <a id="home" href="#">
            <span>Home</span>
          </a>
        </Push>
        <h4 class="main-title">Dashboard</h4>
      </div>
      <div class="user-info">
        <div class="user-icon" style="margin-left: 50px;">
          <i class="fas fa-user" style="color: black; width: 100%; font-size: 2rem;"></i>
        </div>
        <div id="notif">
          <h4>Bell</h4>
        </div>
      </div>
    </div>

    <!-- <div class="welcome">
        <div>
          <h1>Welcome Bos Bakso</h1>
        </div>
    </div>-->
  </div>
</template>

<script>
import { Push } from "vue-burger-menu";
export default {
  props: ["titleCard"],
  components: { Push }
};
</script>

<style>
.header {
  height: 8vh;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
}

.info {
  height: 8vh;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 70px;
}

h4.main-title {
  font-size: 2rem;
}

.user-info {
  width: 30%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: right;
}

/* .welcome {
    height: 7vh;
    padding: 20px
  } */

  .bm {
    width: 1rem;
    height: 1rem;
  }
</style>