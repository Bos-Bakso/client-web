<template>
  <div class="wrap">
    <div class="top">
      <div class="listAll">

      </div>
      <RegisterAbang/>

    </div>
  </div>
</template>

<script>
import RegisterAbang from "../components/RegisterAbang"
export default {
  components: {RegisterAbang}
}
</script>

<style scoped>
  *{
    font-size: 2rem; 
  }

  .wrap {
    margin-top: 8rem;
  }

  .top {
    display: flex;
    
  }

</style>