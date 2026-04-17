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
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="12">
        <BarbellVisualizer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarbellVisualizer from '../components/BarbellVisualizer.vue'

const BRZYCKI_BASE_COEFFICIENT = 1.0278
const BRZYCKI_REPS_COEFFICIENT = 0.0278

export default {
  name: 'OneRM',

  components: {
    BarbellVisualizer,
  },

  data: () => ({
    lift: "",
    units: "lbs",
    repetitions: "",
    answer: "",
    items: ["kg", "lbs"],
  }),

  methods: {
    result() {
      if(parseInt(this.lift) >= 0 && parseInt(this.repetitions) >= 0)
      {
        // Brzycki formula for estimating one-rep max from reps performed.
        this.answer = Math.round(
          parseInt(this.lift) /
          (BRZYCKI_BASE_COEFFICIENT - (BRZYCKI_REPS_COEFFICIENT * parseInt(this.repetitions)))
        );
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


<style scoped>

.text {
  padding: 20px;
}

.answer {
  padding: 15px;
  text-align: center;
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
