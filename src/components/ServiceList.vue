<template>
  <div class="row container">
    <div class="myCard">
      <div class="myInfo">
        <!-- <img :src="serviceInfo.tukangBasoId.image" /> -->
        <img :src="icon[serviceInfo.problem]" />
        <!-- <img src="../../assets/service/police.png"/> -->
        <div class="content">
          <h4>{{serviceInfo.problem}}</h4>
          <h5>reported by : {{serviceInfo.tukangBasoId.username}}</h5>
          <h5><strong>{{serviceInfo.createdAt}}</strong></h5>
          <!-- <h5 class="vsmall">Location</h5> -->
        </div>
        <img :src="serviceInfo.tukangBasoId.image" />
      </div>

      <!-- {"solve":true,"
        _id":"5dd2941f228ba721d192754e",
        "problem":"Police Issue",
        "latitude":37.785834,
        "longitude":-122.406417,
        "tukangBasoId":{
            "history":[],
            "isOwner":false,
            "role":"baso",
            "latitude":37.785834,
            "longitude":-122.406417,
            "_id":"5dce663d8618361165a1ce87",
            "username":"pikachu",
            "password":"$2b$10$wUVPheWUcufR3gmvdUybq.o/CnFTv5GgUrAmzSknUq0O.UhE931nO",
            "image":"https://storage.googleapis.com/bosbakso/1573807677370kachu.jpg","__v":0
        },
        "createdAt":"2019-11-18T12:52:47.662Z",
        "updatedAt":"2019-11-19T03:25:37.598Z",
      "__v":0}-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   icon: require("../../assets/service/police.png")
      //   icon: `${process.env.BASE_URL}../../assets/service/police.png`
      icon: {
        "Police Issue": require(`../../assets/service/police.png`),
        "Tire Issue": require(`../../assets/service/ban.png`),
        "Less Ingredient": require(`../../assets/service/sauce.png`),
        "Low Battery": require(`../../assets/service/battery.png`),
        Medice: require(`../../assets/service/medice.png`),
        "Edit Profile": require(`../../assets/service/user.png`),
        Service: require(`../../assets/service/teknik.png`),
        "Gas Issue" : require(`../../assets/service/gas.png`)
      }
    };
  },
  props: ["serviceInfo"],
  computed: {}
};
</script>

<style scoped>
.container {
  margin-top: 1.6rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  width: 350px;
  padding: 1vh;
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
  width: 100%;
  justify-content: center;
  align-items: center;
}

.myInfo img {
  width: 40px;
  height: 60%;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  object-fit: cover;
  margin-right: 4vh;
}

.myInfo h4 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vh 0;
  margin-right: 4vh;
  width: 70%;
}
h5,h4,p {
    margin: 0;
}
.vsmall{
    padding : .5vh 1vh;
    cursor: pointer;
    margin : .5vh;
    background-color: aqua;
    border-radius: 5px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
}
.vsmall:hover{
    background-color: whitesmoke;
}
</style>