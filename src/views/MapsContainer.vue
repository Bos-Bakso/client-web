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
              <Search @search="search" id="search" style="margin-bottom: 25px;"></Search>
            </div>
            <div id="topAbang" style="width: 100%;">
              <div v-if="filter().length === 0">
                <p id="notFound">Abang not found</p>
              </div>
              <div v-else>
                <ListAbang
                  v-for="abang in filter()"
                  :key="abang._id"
                  :abanginfo="abang"
                />
              </div>
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
import Search from "../components/Search";

export default {
  components: { Maps, ListAbang, Search },
  data: function() {
    return {
      searchtext: "",
    };
  },
  methods: {
    search(value) {
      this.searchtext = value;
    },
    filter() {
      let regex = new RegExp(`^${this.searchtext}`);
      let filtered = this.$store.state.listAbangBakso.filter(abang => {
        return regex.test(abang.username.toLowerCase());
      });
      return filtered;
    }
  }
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

#notFound {
    margin: 50% auto;
    width: 100%;
    font-size: 1.8rem;
    text-align: center;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>