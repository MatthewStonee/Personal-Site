<template>
  <v-container>
    <v-row>
      <v-layout align-center wrap class="center">
        <v-col justify="center">
          <v-row>
            <div>
              <h1>Hi! I'm Matthew Stone</h1>
            </div>
          </v-row>
        </v-col>
        <v-col justify="center">
          <v-row>
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
        </v-col>
      </v-layout>
    </v-row>

   <v-row class="section">
    <div data-aos="fade-up">
      <h2>Web Projects</h2>
    </div>
   </v-row>
    <v-row class="button">
      <v-col>
        <v-sheet
            color="grey lighten-1"
            rounded
            elevation="2"
            min-width="200"
            max-width="400"
            max-height="400"
            style="cursor: pointer"
            @click="push1RM"
        >
          <v-img :src="images.deadlift">
            <div class="caption">
              <h2>One Rep Max Calculator</h2>
            </div>
          </v-img>

        </v-sheet>
      </v-col>

        <v-sheet
            color="grey lighten-1"
            rounded
            elevation="2"
            min-width="200"
            max-width="400"
            max-height="400"
            style="cursor: pointer"
            @click="pushCalc"
        >
          <v-img :src="images.calculator">
            <div class="caption">
              <h2>Calculator</h2>
            </div>
          </v-img>

        </v-sheet>
      <v-spacer></v-spacer>
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

.center {
  padding: 200px;
  padding-bottom: 315px;
}

.button {
  padding-bottom: 500px;
}

.section {
  padding-bottom: 60px;
  padding-left: 45px;
}

.caption {
  position: absolute; /* Position the background text */
  bottom: 0; /* At the bottom. Use top:0 to append it to the top */
  background: rgb(0, 0, 0); /* Fallback color */
  background: rgba(0, 0, 0, 0.65); /* Black background with 0.5 opacity */
  color: #f1f1f1; /* Grey text */
  width: 100%; /* Full width */
  padding: 15px; /* Some padding */
  text-align: center;
  height: 50px;
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

  methods: {

    push1RM() {
      this.$router.push({ name: "onerm" }).catch(err => {console.log("Redundant Navigation, error: " + err)})
    },
    pushCalc() {
      this.$router.push({ name: "Calculator" }).catch(err => {console.log("Redundant Navigation, error: " + err)})
    }
  },


};
</script>
