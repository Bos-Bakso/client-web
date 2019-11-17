<template>
  <div class="container-fluid" style="margin-top: 8rem;">
    <!-- MAPS -->
    <div class="row maps-container">
      <div class="col-md-6">
        <div class="card">
          <Maps style="height: 60vh;" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="card" style="height: 60vh; padding: 2rem;">
          <div class="rank-title">
            <div class="top">
              <h4 id="chart-title" style="margin-bottom: 25px;">All Abang</h4>
            </div>
            <div id="topAbang">
              <ListAbang
                v-for="abang in this.$store.state.listAbangBakso"
                :key="abang._id"
                :abanginfo="abang"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Maps from "../components/Maps";
import ListAbang from "../components/ListLoginAbang";
export default {
  components: { Maps, ListAbang }
};
</script>

<style>
.highlight-info {
  display: flex;
  justify-content: center;
  margin-top: 8rem;
}

.maps-container {
  display: flex;
  justify-content: center;
}

#chart-title {
  font-size: 2.2rem;
}
</style>