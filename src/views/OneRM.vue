<template>
  <v-container>
    <div class="cards">
        <v-card
            max-height="525"
            :width="width"
            elevation="10"
        >
          <v-card-title id="title">1 Rep Max Calculator</v-card-title>
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

    <div class="cards2">
      <v-card
          max-height="425"
          :width="width"
          elevation="10"
      >
        <v-card-title id="title">Kilo Plates to lbs Converter</v-card-title>
        <p id="cap">Enter the total kilo weight of the plates on one half of the bar</p>
        <p id="cap">This converter converts the entered kilo weight to lbs, doubles it, and then adds another 44lbs for the weight of the bar</p>

        <div class="reps">
          <v-text-field
              label="Kilos"
              type="number"
              v-model.number.trim="kilos"
              v-on:keypress.enter="convert"
              outlined
              placeholder="30.5"
          ></v-text-field>
        </div>


        <div id="render" class="answer">
          <h2>{{ conversion }}</h2>
        </div>

        <v-btn
            @click="convert"
            large
            color="red"
            class="white--text btn"
        >
          Calculate Weight in lbs
        </v-btn>

      </v-card>

    </div>


  </v-container>
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
    kilos:"",
    conversion:""
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

    convert() {

      this.conversion = Math.round(parseFloat(this.kilos) / 0.45359237 * 2 + 44 )

      this.conversion = this.conversion + " lbs is on the bar"

    },

  },


};
</script>


<style scoped>

.cards {
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  margin-top: 30px;
  padding: 15px;
}

.cards2 {
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: 15px;
  margin-top: -500px;

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
  align-content: center;
  text-align: center;
  white-space: normal;
}

#cap {
  text-align: justify;
  padding-left: 15px;
  padding-right: 15px;
}

v-text-field{
  width: 15px;
}

</style>

