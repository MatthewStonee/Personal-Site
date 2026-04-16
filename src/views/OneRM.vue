<template>
  <v-container>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="6" class="d-flex justify-center">
        <v-card width="100%" max-width="600" elevation="10">
          <v-card-title id="title">1 Rep Max Calculator</v-card-title>
          <p id="cap">Enter a weight and the maximum amount of reps you can do to find out your one rep max!</p>

          <div class="reps">
            <v-row no-gutters>
              <v-col cols="9" class="text">
                <v-text-field
                    label="Lift"
                    type="number"
                    v-model.number="lift"
                    variant="outlined"
                    placeholder="185"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                    v-model="units"
                    :items="items"
                    label="Unit"
                    variant="outlined"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <div class="reps">
            <v-text-field
                label="Repetitions"
                type="number"
                v-model.number="repetitions"
                v-on:keypress.enter="result"
                variant="outlined"
                placeholder="3"
            ></v-text-field>
          </div>

          <v-card-actions class="justify-center pb-4">
            <v-btn
                @click="result"
                size="large"
                color="blue"
            >
              Calculate
            </v-btn>
          </v-card-actions>

          <div class="answer">
            <h2>{{ answer }}</h2>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" class="d-flex justify-center">
        <v-card width="100%" max-width="600" elevation="10">
          <v-card-title id="title">Kilo Plates to lbs Converter</v-card-title>
          <p id="cap">Enter the total kilo weight of the plates on one half of the bar</p>
          <p id="cap">This converter converts the entered kilo weight to lbs, doubles it, and then adds another 44lbs for the weight of the bar</p>

          <div class="reps">
            <v-text-field
                label="Kilos"
                type="number"
                v-model.number="kilos"
                v-on:keypress.enter="convert"
                variant="outlined"
                placeholder="30.5"
            ></v-text-field>
          </div>

          <v-card-actions class="justify-center pb-4">
            <v-btn
                @click="convert"
                size="large"
                color="blue"
            >
              Convert
            </v-btn>
          </v-card-actions>

          <div class="answer">
            <h2>{{ conversion }}</h2>
          </div>
        </v-card>
      </v-col>
    </v-row>
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


  methods: {

    result() {
      if(parseInt(this.lift) >= 0 && parseInt(this.repetitions) >= 0)
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


.text {
  padding: 20px;
}

.answer {
  padding: 15px;
  text-align: center;
}

.btn {
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.reps {
  padding: 15px;
}

#title {
  font-size: clamp(18px, 4vw, 30px);
  font-weight: 800;
  letter-spacing: 0.5px;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  margin-bottom: 4px;
}

#cap {
  text-align: justify;
  padding-left: 15px;
  padding-right: 15px;
}

</style>

