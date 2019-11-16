<template>
    <div class="wrapper">
        <div class="left">
          <img src="../../assets/bowl.png" alt="">
        </div>
        <div class="right">
            <div style="width: 50%;" v-if="Login">
                <p class="label">Login</p>
                <form @submit.prevent="login">
                    <input v-model="username" type="text" placeholder="Username">
                    <input v-model="password" type="password" placeholder="Password">
                    <button type="submit">Sign In</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      password: '',
      Login: true
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', { username: this.username, password: this.password })
    }
  }
}
</script>

<style scoped>
  *{
    font-size: 125%;
  }

    button{
        padding: 0.6rem 1rem;
        font-size: 1rem;
        border-radius: 5px;
        outline: none;
        color: white;
        background-color: #3c85e6;
    }
    button:hover {
        background-color: #2c73d1;
    }
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
        margin-top: 20vh;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .label{
        font-size: 2rem;
    }
    .wrapper {
        display: grid;
        height: 93vh;
        grid-template-columns: 1fr 1fr;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    input, button {
        margin-bottom: 2vh;
        padding: 1vh 0.5vw;
        font-size: 1rem;
    }
</style>
