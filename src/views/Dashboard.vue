<template>
  <div>
    <div class="content">
      <!-- Highlight Info 3 cards -->
      <div class="cotainer-fluid">
        <div class="row highlight-info" style="width: 100%; padding:0;">
          <!-- Card Revenue yang masuk -->
          <div class="col-md-6 col-lg-3">
            <div class="card">
              <div class="card__header">
                <div class="card__icon card__icon--green">
                  <i class="fas fa-store" style="color: white; width: 100%;"></i>
                </div>
                <p class="card__category">Revenue</p>
                <h3 class="card__title">
                  IDR {{nFormatter}}
                  <small></small>
                </h3>
              </div>
            </div>
          </div>

          <!-- Card Issue atau services yang udah di solved -->
          <div class="col-md-6 col-lg-3">
            <div class="card">
              <div class="card__header">
                <div class="card__icon card__icon--red">
                  <i class="fas fa-exclamation-circle" style="color: white; width: 100%;"></i>
                </div>
                <p class="card__category">Fixed Issues</p>
                <h3 class="card__title">
                  75
                  <small></small>
                </h3>
              </div>
            </div>
          </div>

          <!-- Card Total abang bakso -->
          <div class="col-md-6 col-lg-3">
            <div class="card">
              <div class="card__header">
                <div class="card__icon card__icon--blue">
                  <i class="fas fa-user" style="color: white; width: 100%;"></i>
                </div>
                <p class="card__category">Total Abang</p>
                <h3 class="card__title">
                  {{totalAbang}}
                  <small></small>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <!-- CHART -->
        <div class="row chart-content" style="padding">
          <div class="col-md-6">
            <div class="card" style="padding: 2rem;">
              <h4 id="chart-title">Sales Chart</h4>
              <SalesChart />
            </div>
          </div>
          <div class="col-md-3">
            <div class="card" style="height: 473px; padding: 2rem;">
              <div class="rank-title">
                <h4 id="chart-title" style="margin-bottom: 25px;">Top Abang</h4>
                <div class="topAbang" id="style-3">
                  <TopAbang
                    v-for="(abang, index) in topRankAbang"
                    :key="abang._id"
                    :abanginfo="abang"
                    :rank="index"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MAPS -->
      </div>
    </div>
  </div>
</template>

<script>
import SalesChart from "../components/SalesChart";
import Maps from "../components/Maps";
import ListAbang from "../components/ListLoginAbang";
import TopAbang from "../components/TopRankAbang";

export default {
  components: { SalesChart, Maps, ListAbang, TopAbang },
  data: function() {
    return {
      totalAbang: 0,
      totalIncome: 0,
      listabangs: [],
      lisTransactions: [],
      topRankAbang: []
    };
  },
  methods: {
    listAbang: function(abangs, transactions) {
      const arr = [];
      const obj = {
        abang: null
      };

      abangs.forEach(abang => {
        const totalTransactions = transactions.filter(
          el => el.tukangBaksoId == abang._id
        );

        abang.totalBakso = totalTransactions.length;
        this.topRankAbang.push(abang);
      });
      this.sortAbang(this.topRankAbang);
    },
    sortAbang(arr) {
      const sorted = [];

      arr.sort((a, b) => b.totalBakso - a.totalBakso);
      this.$store.commit("SET_ABANG_BAKSO", arr);
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.$store
      .dispatch("getTotalAbang")
      .then(data => {
        this.listabangs = data;
        this.totalAbang = data.length;
        return this.$store.dispatch("getTransactions");
      })
      .then(data => {
        this.lisTransactions = data.penjualanBakso;
        this.totalIncome = data.penjualanBakso.length * 15000;
        this.listAbang(this.listabangs, this.lisTransactions);
      });
  },
  computed: {
    nFormatter: function() {
      var si = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (this.totalIncome >= si[i].value) {
          break;
        }
      }
      return (this.totalIncome / si[i].value).toFixed(1).replace(rx, "$1") + si[i].symbol;
    }
  }
};
</script>

<style scoped>
.myContainer {
  width: 70%;
  margin: 0 auto;
}

.card-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.row {
  width: 100% !important;
}

.content {
  width: 100%;
}

.card {
  border-radius: 5px;
  margin: 2rem 0;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
}
.card__header {
  position: relative;
  padding: 1rem;
}
.card__icon {
  align-items: center;
  display: flex;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(156, 39, 176, 0.4);
  text-align: center;
  border-radius: 3px;
  margin-top: -4rem;
  padding: 2rem;
  float: left;
  z-index: 1;
}

.card__icon--green {
  background-image: linear-gradient(60deg, #66bb6a, #43a047);
}
.card__icon--red {
  background-image: linear-gradient(60deg, #ef5350, #e53935);
}
.card__icon--blue {
  background-image: linear-gradient(60deg, #26c6da, #00acc1);
}
.card__icon i {
  color: #fff;
  font-size: 3rem;
  width: 48px !important;
}
.card__category {
  display: block;
  text-align: right;
  font-size: 1.4rem;
  color: #999;
  top: 10px;
  width: 96%;
}
.card__title {
  font-size: 2.4rem;
  font-weight: lighter;
  text-align: right;
  width: 96%;
}
.card__title small {
  font-weight: 600;
}
.card__body {
  margin: 0 auto;
  padding: 0.5rem 0 1rem 0;
  width: 90%;
}
.card__body h4 {
  font-size: 2.2rem;
  font-weight: lighter;
}
.card__body p {
  color: #888888;
  font-size: 1.4rem;
}
.card__footer {
  display: flex;
  border-top: 1px solid #eee;
  font-size: 1.2rem;
  margin: 0 auto;
  padding: 1rem 1rem;
  width: 90%;
}
.card__footer i {
  color: #6f6f6f;
  font-size: 1.4rem;
}
.card__footer a {
  color: #888888;
  text-decoration: none;
  align-self: center;
  margin-left: 0.5rem;
  font-size: 1.3rem;
}

.highlight-info {
  display: flex;
  justify-content: center;
  margin-top: 8rem;
}

.chart-content {
  display: flex;
  justify-content: center;
  width: 100%;
}

.chart-container {
  border-radius: 5px;
  margin: 2rem 0;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  margin-top: 2.5rem;
  margin-left: 5rem;
  width: 100%;
  background: #fff;
  padding: 2rem;
}

.chart-other {
  border-radius: 5px;
  margin: 2rem 0;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  width: 400px;
  background: #fff;
  height: 4vh;
}

#chart-title {
  font-size: 2.2rem;
}

.maps-container {
  display: flex;
  justify-content: center;
}

.topAbang {
  height: 390px;
  overflow: auto;
}

#style-3::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar-thumb {
  background-color: #000000;
}
</style>
