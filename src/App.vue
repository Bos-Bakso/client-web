<template>
  <div id="app">
    <div id="nav">
      <div v-if="this.$store.state.isLogin">
        <Header />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  components: { Header }
}
</script>

<style>
* {
  font-size: 62.5%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none !important;
}

#app {
  background: #f6f6f6;
  width: 100%;
  min-height: 100vh;
}
</style>
