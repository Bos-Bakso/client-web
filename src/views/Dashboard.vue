<template>
  <div>
    <div class="content">

      <!-- Header Dashboard -->
      <DashboardHeader />

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
                  IDR 49,500
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
                  213
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
                <h4 id="chart-title">Top Abang</h4>
              </div>
            </div>
          </div>
        </div>

        <!-- MAPS -->
        <div class="row maps-container">
          <div class="col-md-3">
            <ListAbang />
          </div>
          <div class="col-md-6">
            <div class="card">
              <Maps style="height: 60vh;" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardHeader from '../components/DashboardHeader'
import SalesChart from '../components/SalesChart'
import Maps from '../components/Maps'
import ListAbang from '../components/ListLoginAbang'

export default {
  components: { DashboardHeader, SalesChart, Maps, ListAbang },
  data: function () {
    return {
      cardTitle: [
        { title: 'Total Abang', desc: 'Total Abang Bako registered', data: 20 },
        { title: 'Sales', desc: 'Total profit', data: 120 },
        { title: 'Total spent', desc: 'Total profit', data: 120 }
      ]
    }
  }
}
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
</style>
