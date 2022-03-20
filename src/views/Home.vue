<template>
  <v-container>
    <v-row class="home">
      <v-col>
        <h1>Hi! I'm Matthew Stone</h1>
      </v-col>
      <v-sheet
          color="grey lighten-1"
          rounded
          elevation="8"
          min-width="200"
          max-width="600"
      >
        <v-img :src="images.profile"></v-img>
      </v-sheet>
    </v-row>
  </v-container>



</template>

<style scoped>
/*#title {
  font-family: "Iowan Old Style";
  font-size: 35px;
}*/

h1 {
  color: white;
  font-size: 60px;
  font-family: "Prompt";
}

h2{
  color:white;
  font-size: 27px;
  font-family: "Prompt";
}

.home {
  width: 65%;
  max-width: 700px;
  margin: auto;
  margin-bottom: 5px;
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
