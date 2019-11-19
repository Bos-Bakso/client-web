<template>
  <div>
    <div class="container">
      <div class="row" style="margin-top: 60px;">
        <!-- list abang service -->
        <div class="col-md-4">
          <div class="card" style="padding: 2rem;">
            <transition name="fade">
              <div v-if="showForm === false">
                <h4 class="chart-title">List Abang Service</h4>
                <div class="addAbang">
                  <div
                    class="btn btn-warning btn-sm add-btn"
                    style="margin-bottom : 2vh"
                    @click="addService"
                  >Add +</div>
                </div>
                <div
                  class="containerService"
                  style="width: 100%; height: 450px; overflow: auto; overflowX : hidden;"
                >
                  <ListAbang
                    style="width: 99%;"
                    v-for="abang in abangService"
                    :key="abang._id"
                    :abanginfo="abang"
                  />
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div v-if="showForm">
                <div class="top">
                  <h4 class="chart-title" style="margin-bottom: 25px;">Add Abang Service</h4>
                </div>

                <div class="addAbang">
                  <div
                    class="btn btn-danger btn-sm add-btn"
                    @click="cancelAdd"
                    style="margin-bottom : 2vh"
                  >Cancel</div>
                </div>

                <div class="topAbang" style="width: 100%;">
                  <form @submit.prevent="newAbang" class="myForm">
                    <input
                      class="form-control"
                      v-model="username"
                      type="text"
                      placeholder="Username"
                    />
                    <input
                      class="form-control"
                      v-model="facebook"
                      type="text"
                      placeholder="facebook"
                    />
                    <input
                      class="form-control"
                      v-model="password"
                      type="password"
                      placeholder="Password"
                    />
                    <form
                      id="img-form"
                      action="/profile"
                      method="post"
                      enctype="multipart/form-data"
                    >
                      <input
                        type="file"
                        ref="image"
                        accept="image/*"
                        v-on:change="handleimage"
                        required
                      />
                    </form>
                    <button
                      v-if="!loadingForm"
                      @click.prevent="newAbang"
                      type="submit"
                      class="btn btn-primary"
                    >Submit</button>
                    <button v-else type="submit" @click.prevent class="btn btn-primary">
                      <i class="fas fa-spinner fa-pulse" style="font-size: 1.5rem;"></i>
                    </button>
                  </form>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!--  -->
        <!-- list service solved -->
        <div class="col-md-4">
          <div class="card" style="padding: 2rem;">
            <h4 class="chart-title">List Service Solved</h4>
            <div
              class="containerService"
              style="width: 100%; height: 500px; overflow: auto; overflow-x:hidden"
            >
              <!-- <p style="fontSize : 18px">{{JSON.stringify(service)}}</p> -->
              <ServiceList v-for="(list,i) in solveService" :key="i" :serviceInfo="list"></ServiceList>
            </div>
          </div>
        </div>
        <!--  -->

        <!-- list service solved -->
        <div class="col-md-4">
          <div class="card" style="padding: 2rem;">
            <h4 class="chart-title">List Service Unsolved</h4>
            <div
              class="containerService"
              style="width: 100%; height: 500px; overflow: auto; overflow-x:hidden"
            >
              <ServiceList v-for="(list,i) in unsolvedService" :key="i" :serviceInfo="list"></ServiceList>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ServiceList from '../components/ServiceList';
import ListAbang from '../components/ListLoginAbang';
import { TriggerNotif } from '../api/firebase';

export default {
  components: {
    ServiceList,
    ListAbang
  },
  data () {
    return {
      isLoading: false,
      loadingForm: false,
      showForm: false,
      username: '',
      password: '',
      facebook: ''
      //   abangService : this.$store.state.abangService
    }
  },
  methods: {
    fetchService () {
      this.$store.dispatch('fetchService')
    },
    fetchAbangService () {
      this.$store.dispatch('fetchAbangService')
    },
    addService () {
      this.showForm = true
    },
    cancelAdd () {
      this.showForm = false
    },
    handleimage () {
      this.image = this.$refs.image.files[0]
    },
    newAbang () {
      this.loading = true
      let formData = new FormData()

      formData.append('username', this.username)
      formData.append('facebook', this.facebook)
      formData.append('password', this.password)
      formData.append('image', this.image)
      formData.append('role', 'service')

      this.$store
        .dispatch('addAbangService', formData)
        .then(data => {
          console.log('helloo')
          this.loading = false
          this.fetchAbangService()
          this.username = '';
          this.password = '';
          this.facebook = '';
          this.showForm = false
          this.$toasted.show('New Abang Added', {
            theme: 'outline',
            position: 'top-right',
            duration: 3000,
            type: 'success'
          })
        })
        .catch(err => {
          this.loading = false
          this.$toasted.show('Add Abang Fail', {
            theme: 'outline',
            position: 'top-right',
            duration: 3000,
            type: 'fail'
          })
        })
    }
  },
  created () {
    TriggerNotif.onSnapshot(querySnapshot => {
      this.fetchService()
      this.fetchAbangService()
    })
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
    this.isLoading = true
    this.fetchService()
    this.fetchAbangService()
  },
  computed: {
    ...mapState(['service', 'abangService']),
    solveService: function () {
      return this.service.filter(list => list.solve)
    },
    unsolvedService: function () {
      return this.service.filter(list => !list.solve)
    }
  }
}
</script>

<style scoped>
.loading {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loaderImage {
  height: 300px;
  width: 300px;
}
.chart-title {
  font-size: 2.2rem;
}
.containerService::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.containerService::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.containerService::-webkit-scrollbar-thumb {
  background-color: #000000;
}

.fade-enter-active {
  transition: opacity 1.5s;
}
.fade-leave-active {
  opacity: 0;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
input,
button {
  margin-bottom: 2vh;
  font-size: 1.5rem;
}
</style>
