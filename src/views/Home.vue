<template>
  <v-container class="header">
    <div>
      <div>
        <h1>Hi 👋 I’m Matthew Stone!</h1>
        <h2>I’m a software engineer at Bolt and graduate of the University of Central Florida</h2>
      </div>
    </div>


    <div class="container-1">
      <div class="Exp">
        <p>🎓  B.S. Computer Science @ UCF</p>
        <p class="p2">📍 Grew up in Central Florida</p>
        <p>💪 Love to workout, game, and trade stocks</p>
        <p class="p2">⌨️ There are some simple web apps on this website that I built while learning different aspects of web development!</p>
      </div>

      <div class="image">
        <v-sheet
            color="grey lighten-1"
            rounded
            elevation="8"
            max-width="325"
        >
          <v-img :src="images.profile"></v-img>
        </v-sheet>
      </div>
    </div>




  </v-container>

</template>

<style scoped>

.header {
  width: 100%;
  margin: auto;
  padding: 50px;
  margin-bottom: 15px;
  max-width: 800px;
  text-align: justify;
  font-family: Prompt, monospace;
}

h1 {
  color: white;
  margin-bottom: 25px;
  font-size: 45px;
}

h2{
  color:white;
  font-size: 27px;
  margin-bottom: 10px;
}

p{
  color:white;
  font-size: 16px;
  margin-bottom: 5px;
  max-width: 255px;
  text-align: justify;
}
.p2 {
  color:white;
  font-size: 16px;
  margin-top: 50px;
  text-align: justify;
}

@media (min-width: 600px) {
  .container-1 {
    display: flex;
    margin-top: 30px;
  }

}

.Exp {
  flex:2;
  margin-bottom: 30px;
}

.image {
  flex: 1;
  margin-right: 75px;
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
        deadlift: require('../images/deadlift.jpeg'),
        calculator: require('../images/calculator.png'),
      }
    }
  },
  


};
</script>
