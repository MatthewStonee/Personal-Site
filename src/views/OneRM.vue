<template>
  <v-container>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="6" class="d-flex justify-center">
        <v-card width="100%" max-width="600" elevation="10">
          <v-card-title class="card-title">1 Rep Max Calculator</v-card-title>
          <p class="card-caption">Enter a weight and the maximum amount of reps you can do to find out your one rep max!</p>

          <div class="reps">
            <v-row no-gutters>
              <v-col cols="9" class="text">
                <v-text-field
                    label="Lift"
                    type="number"
                    min="0"
                    v-model.number="lift"
                    @keydown.enter="result"
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
                min="1"
                :max="MAX_REPS"
                v-model.number="repetitions"
                @keydown.enter="result"
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
// The formula drifts badly past about a dozen reps and divides by zero near 37.
const MAX_REPS = 12

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
    MAX_REPS,
  }),

  methods: {
    result() {
      const lift = parseFloat(this.lift);
      const reps = Number(this.repetitions);

      if (!(lift > 0) || !Number.isInteger(reps) || reps < 1) {
        this.answer = "Enter a lift weight and the number of reps you completed.";
        return;
      }
      if (reps > MAX_REPS) {
        this.answer = `Estimates are only reliable up to ${MAX_REPS} reps.`;
        return;
      }

      // Brzycki formula for estimating one-rep max from reps performed.
      const oneRepMax = Math.round(
        lift / (BRZYCKI_BASE_COEFFICIENT - (BRZYCKI_REPS_COEFFICIENT * reps))
      );
      this.answer = `Your one rep max is ${oneRepMax} ${this.units}`;
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

.card-title {
  font-size: clamp(18px, 4vw, 30px);
  font-weight: 800;
  letter-spacing: 0.5px;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  margin-bottom: 4px;
}

.card-caption {
  text-align: justify;
  padding-left: 15px;
  padding-right: 15px;
}

</style>
