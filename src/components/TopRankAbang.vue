<template>
  <div class="row" style="margin-top:1.6rem; box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
">
    <div class="myCard">
      <div class="myInfo">
        <img :src="abanginfo.image" alt="">
        <h4>{{abanginfo.username}}</h4>
      </div>
      <div class="rank">
        <div v-if="rank === 0">
          <i class="fas fa-medal" style="color:gold; font-size: 4rem;"></i>
        </div>
         <div v-else-if="rank === 1">
          <i class="fas fa-medal" style="color: silver; font-size: 4rem;"></i>
        </div>
        <div v-else-if="rank === 2">
          <i class="fas fa-medal" style="color: #D1873C; font-size: 4rem;"></i>
        </div>
        <div v-else> 
          <i class="fas fa-medal" style="color: #262626; font-size: 4rem;"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['abanginfo','rank'],
  data: function() {
    return {
      
    }
  },
}
</script>

<style scoped>
  * {
    font-size: 1.2rem;
  }


  .myCard {
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin: 8px 0;
  }

  .myInfo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .myInfo img {
    width: 60px;
    height: 100%;
    border-radius: 50%;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  }

  .myInfo h4 {
    text-align: center;
    margin-left: 1.5rem;
    font-size: 1.5rem;
  }
</style>
