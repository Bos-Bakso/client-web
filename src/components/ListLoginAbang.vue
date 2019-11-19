<template>
  <div class="row" style="margin-top:1.6rem; box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
">
    <div class="myCard">
      <div class="myInfo">
        <img :src="abanginfo.image" alt style="object-fit: cover;" />
        <b class="ml-5">{{abanginfo.username}}</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['abanginfo', 'rank'],
  data: function () {
    return {}
  }
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
  width: 45px;
  height: 45px;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
}
</style>
