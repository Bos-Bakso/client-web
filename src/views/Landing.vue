<template>
    <div class="wrapper">
        <div class="left">
          <img src="../../assets/bowl.png" alt="" style="width: 200px; height: 80px">
        </div>
        <div class="right">
            <div style="width: 20%;" v-if="Login">
                <p class="label">Login</p>
                <form @submit.prevent="login">
                    <input class="form-control" v-model="username" type="text" placeholder="Username">
                    <input class="form-control" v-model="password" type="password" placeholder="Password">
                    <button v-if="loading === false" @click.prevent="login" type="submit" class="btn btn-primary">Sign in</button>
                    <button v-else type="submit"  @click.prevent="" class="btn btn-primary"><i class="fas fa-spinner fa-pulse" style="font-size: 1.5rem;"></i></button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client"
export default {
  data: function () {
    return {
      username: '',
      password: '',
      loading: false,
      Login: true,
      // socket: io.connect('http://34.87.107.88')
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$store.dispatch('login', { username: this.username, password: this.password })
        .then(user => {
          console.log(user)
          this.$store.commit('SET_BOS_IMAGE', user.image)
          this.loading = false
        })
    }
  },
  created() {
    // this.socket.on("test", data => {
    //   console.log(data, 'socket')
    // })
  }
}
</script>

<style scoped>

  *{
    font-size: 200rem;
  }

    /* button{
        padding: 0.6rem 1rem;
        font-size: 1rem;
        border-radius: 5px;
        outline: none;
        color: white;
        background-color: #3c85e6;
    }
    button:hover {
        background-color: #2c73d1;
    } */
    .link {
        color: black;
        text-decoration: none;
    }
    .link:hover{
        text-decoration-line: underline
    }
    img{
        width: 70%;
        height: 50%;
        object-fit: contain;

    }
    .right, .left {
        display: flex;
        justify-content: center;
    }
    .label{
        font-size: 2rem;
    }
    .wrapper {
        display: flex;
        padding-top: 20vh;
        flex-direction: column;
        /* grid-template-columns: 1fr 1fr; */
    }

    .right {
      margin-top: 40px;
      padding: 0 3rem;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    input, button {
        margin-bottom: 2vh;
        /* padding: 1vh 0.5vw; */
        font-size: 1.5rem;
    }
</style>
