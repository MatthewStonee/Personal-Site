<template>
  <div class="header">
    <div class="intro">
      <div>
        <h1>Hi 👋 I’m Matthew Stone!</h1>
        <h2>I’m a Computer Science graduate from the University of Central Florida looking to further my knowledge
            in everything tech!

        </h2>
      </div>


      <div class="container-1">
        <div class="Exp">
          <p>🎓B.S. Computer Science @ University of Central Florida</p>
          <p class="p2">📍 Grew up in Florida</p>
          <p>💪 Love to workout, game, and trade stocks</p>
          <p class="p2">💻️ There are some simple web apps on this website that I built while learning different aspects of Vue.js and web development!</p>
        </div>

        <div class="image">
          <v-sheet
              color="grey lighten-1"
              rounded
              elevation="8"
              max-width="345"
          >
            <v-img :src="images.profile"></v-img>
          </v-sheet>
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>

.intro {
  width: 100%;
  padding: 45px;
  max-width: 815px;
  text-align: left;
  font-family: Prompt, monospace;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

h1 {
  color: white;
  margin-bottom: 25px;
  font-size: 45px;
}

h2{
  color:white;
  font-size: 27px;
  margin-bottom: 5px;
}

p{
  color:white;
  font-size: 17px;
  text-align: justify;
}
.p2 {
  color:white;
  font-size: 17px;
  margin-top: 10px;
  text-align: justify;
}

@media (min-width: 700px) {
  .container-1 {
    display: flex;
  }

}

.Exp {
  flex:2;
  padding-right: 35px;
  margin-top: 55px;
  margin-bottom: 25px;
}

.image {
  flex: 1;
  margin-right: 55px;
}

</style>

<script>

export default {
  name: 'Home',

  components: {
  },

  created() {
    document.title = "Home";
  },

  data() {
    return {
      images: {
        profile: require('../images/profile.jpg'),
      }
    }
  },



};
</script>
