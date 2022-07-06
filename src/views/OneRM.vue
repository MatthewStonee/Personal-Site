<template>
  <div class="cards">
      <v-card
          max-height="525"
          :width="width"
          elevation="10"
      >
        <v-card-title id="title">One Rep Max Calculator</v-card-title>
        <p id="cap">Enter a weight and the maximum amount of reps you can do to find out your one rep max!</p>

        <div class="reps">
          <v-row  no-gutters
          >
            <v-col cols="9" class="text">
              <v-text-field
                  label="Lift"
                  type="number"
                  v-model.number.trim="lift"
                  outlined
                  placeholder="185"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                  v-model="units"
                  :items="items"
                  label="Unit"
                  outlined
                  :menu-props="{offsetY: true }"
              ></v-select>
            </v-col>
          </v-row>
        </div>

        <div class="reps">
          <v-text-field
              label="Repetitions"
              type="number"
              v-model.number.trim="repetitions"
              v-on:keypress.enter="result"
              outlined
              placeholder="3"
          ></v-text-field>
        </div>


        <div id="render" class="answer">
          <h2>{{ answer }}</h2>
        </div>

        <v-btn
            @click="result"
            large
            color="blue"
            class="white--text btn"
        >
          Calculate One Rep Max
        </v-btn>

      </v-card>


  </div>


</template>

<script>

export default {
  name: 'OneRM',

  components: {
  },

  created() {
    document.title = "One Rep Max Calculator";
  },

  data: () => ({
    lift: "",
    units: "lbs",
    repetitions: "",
    answer: "",
    items: ["kg", "lbs"],
  }),

  computed: {
    width () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 480
        case 'sm': return 500
        case 'md': return 500
        case 'lg': return 600
        case 'xl': return 650
      }
      return 480;
    },
  },

  methods: {

    result() {
      let T = document.getElementById("render");
      T.style.display = "block";

      if(parseInt(this.lift) >= 0 || parseInt(this.repetitions) >= 0)
      {
        this.answer = Math.round(parseInt(this.lift) / (1.0278 - (0.0278 * parseInt(this.repetitions))));
        this.answer = "Your one rep max is " + this.answer + " " + this.units;
      }
      else
      {
        this.answer = "Enter lift weight and repetitions."
      }
    },

  },


};
</script>


<style>

.cards {
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  margin-top: 30px;
}

.text {
  padding: 20px;
}

.answer {
  padding-left: 15px;
  padding-right: 15px;
  text-align: justify-all;
}

.btn {
  margin-top: 20px;
}

.reps {
  padding: 15px;
}

#title {
  font-size: 30px;
}

#cap {
  text-align: justify;
  padding: 15px;
}

v-text-field{
  width: 15px;
}

</style>

