<template>
  <div class="container">
    <div class="row" style="margin-top: 60px;">
      <div class="col-md-4">
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
      <div class="col-md-4">
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
      <div class="col-md-4">
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

    <!-- Chart -->
    <div class="row">
      <div class="col-md-8" style="height: 500px">
        <div class="card">
          <div class="card-header" style="font-size: 18px">Sales Chart</div>
          <SalesChart/>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header" style="font-size: 18px">Top Abang</div>
          <div class="topAbang" id="style-3">
            <TopAbang
              v-for="(abang, index) in this.$store.state.rankAbang"
              :key="abang._id"
              :abanginfo="abang"
              :rank="index"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SalesChart from '../components/SalesChart';
import ListAbang from '../components/ListLoginAbang';
import TopAbang from '../components/TopRankAbang';
import { TriggerRank } from '@/api/firebase';

export default {
  components: { SalesChart, ListAbang, TopAbang },
  data: function () {
    return {
      totalAbang: 0,
      totalIncome: 0,
      listabangs: [],
      lisTransactions: [],
      topRankAbang: []
    }
  },
  methods: {
    listAbang: function (abangs, transactions) {
      const arr = []
      const obj = {
        abang: null
      }

      abangs.forEach(abang => {
        const totalTransactions = transactions.filter(
          el => el.tukangBaksoId == abang._id
        )

        abang.totalBakso = totalTransactions.length
        this.topRankAbang.push(abang)
      })
      this.sortAbang(this.topRankAbang)
    },
    sortAbang (arr) {
      const sorted = []

      arr.sort((a, b) => b.totalBakso - a.totalBakso)
      this.$store.commit('SET_ABANG_BAKSO', arr)
    }
  },
  created () {
    window.scrollTo(0, 0)
    this.$store
      .dispatch('getTotalAbang')
      .then(data => {
        this.listabangs = data
        this.totalAbang = data.length
        return this.$store.dispatch('getTransactions')
      })
      .then(data => {
        this.lisTransactions = data.penjualanBakso
        this.totalIncome = data.penjualanBakso.length * 15000
        this.listAbang(this.listabangs, this.lisTransactions)
      })

    TriggerRank.onSnapshot(querySnapshot => {
      console.log(querySnapshot)
      this.$store.dispatch('fetchRank')
    })
  },
  computed: {
    nFormatter: function () {
      var si = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'K' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' }
      ]
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/
      var i
      for (i = si.length - 1; i > 0; i--) {
        if (this.totalIncome >= si[i].value) {
          break
        }
      }
      return (
        (this.totalIncome / si[i].value).toFixed(1).replace(rx, '$1') +
        si[i].symbol
      )
    }
  }
}
</script>

<style scoped>
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

.topAbang {
  height: 400px;
  overflow: auto;
  overflow-x: hidden;
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
