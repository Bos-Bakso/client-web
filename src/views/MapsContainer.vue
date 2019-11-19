<template>
  <div class="container">
    <div class="row" style="margin-top: 80px">
      <div class="col-md-8">
        <Maps style="height: 550px;" ref="maps" />
      </div>
      <div class="col-md-4">
        <div class="card" style="height: 550px; padding: 2rem;">
          <transition name="fade">
            <div v-if="showForm === false">
              <div class="top">
                <h4 id="chart-title" style="margin-bottom: 25px;">All Abang</h4>
                <Search @search="search" id="search" style="margin-bottom: 25px;"></Search>
              </div>
              <div class="addAbang">
                <div class="btn btn-warning btn-sm add-btn" @click="addAbang">Add +</div>
              </div>
              <div
                class="topAbang"
                id="style-3"
                style="width: 100%; height: 400px; overflow: auto;"
              >
                <div v-if="filter().length === 0">
                  <p id="notFound">Abang not found</p>
                </div>
                <div v-else>
                  <div
                    class="list-abang"
                    v-for="abang in filter()"
                    :key="abang._id"
                    @click="detail(abang.latitude, abang.longitude)"
                  >
                    <ListAbang style="width: 99%;" :abanginfo="abang" />
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="showForm">
              <div class="top">
                <h4 id="chart-title" style="margin-bottom: 25px;">Add New Abang</h4>
              </div>
              <div class="addAbang">
                <div class="btn btn-danger btn-sm add-btn" @click="cancelAdd">Cancel</div>
              </div>
              <div class="topAbang" style="width: 100%;">
                <form @submit.prevent="newAbang" class="myForm">
                  <div>
                    <input
                      class="form-control"
                      v-model="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <input
                    class="form-control"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                  />
                  <input class="form-control" v-model="facebook" type="text" placeholder="Facebook" />
                  <form id="img-form" action="/profile" method="post" enctype="multipart/form-data">
                    <input
                      type="file"
                      ref="image"
                      accept="image/*"
                      v-on:change="handleimage"
                      required
                    />
                  </form>
                  <button
                    v-if="loading === false"
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
    </div>
  </div>
</template>

<script>
import { latLng } from 'leaflet';
import Maps from '../components/Maps';
import ListAbang from '../components/ListLoginAbang';
import Search from '../components/Search';

export default {
  components: { Maps, ListAbang, Search },
  data: function () {
    return {
      showForm: false,
      searchtext: '',
      username: '',
      password: '',
      image: '',
      facebook: '',
      loading: false
    }
  },
  methods: {
    detail (lat, lng) {
      let loc = latLng(lat, lng)
      this.$refs.maps.innerClick(loc)
    },
    search (value) {
      this.searchtext = value
    },
    filter () {
      let regex = new RegExp(`^${this.searchtext}`)
      let filtered = this.$store.state.tukangs.filter(abang => {
        return regex.test(abang.username.toLowerCase())
      })
      return filtered
    },
    addAbang () {
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
      formData.append('password', this.password)
      formData.append('facebook', this.facebook)
      formData.append('image', this.image)
      formData.append('role', 'baso')

      this.$store.dispatch('addAbang', formData).then(_ => {
        this.loading = false
        this.username = '';
        this.password = '';
        this.facebook = '';

        this.getAbang()
        this.showForm = false
        this.$toasted.show('New Abang Added', {
          theme: 'outline',
          position: 'top-right',
          duration: 4000,
          type: 'success'
        })
      })
    },
    getAbang () {
      this.$store.dispatch('fetchTukangs')
    }
  }
}
</script>

<style>
.list-abang {
  cursor: pointer;
}
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

.add-btn {
  font-size: 0.2rem;
  margin-bottom: 15px;
}

.add-btn:hover {
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.myForm {
  /* height: 50vh; */
}

.myForm input,
button {
  margin-bottom: 2vh;
  font-size: 1.5rem;
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
