<template>
  <v-container>

    <v-row class="d-flex flex-wrap justify-center mt-n10 pt-15">
      <v-card
          class="justify-lg-start justify-md-center justify-sm-center ma-2"
          max-height="450"
          :width="width"
          elevation="10"
      >
        <v-card-title id="title">One Rep Max Calculator</v-card-title>
        <v-row  no-gutters class="justify-lg-start justify-md-center justify-sm-center ma-4"
        >
          <v-col cols="9">
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

        <v-row no-gutters class="justify-lg-start justify-md-center justify-sm-center ma-4 mb-n2">
          <v-col cols="12">
            <v-text-field
                label="Repetitions"
                type="number"
                v-model.number.trim="repetitions"
                v-on:keypress.enter="result"
                outlined
                placeholder="3"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="justify-lg-start justify-md-center justify-sm-center ma-5 ">
          <div id="render" style="display:none">
            <h2>{{ answer }}</h2>
          </div>
        </v-row>


        <v-row no-gutters class="justify-lg-start justify-md-center justify-sm-center ma-4">
          <v-col>
            <v-card-actions>
              <v-btn
                  @click="result"
                  large
                  color="blue"
                  class="white--text mt-n2 mb-1 ml-n1"
              >
                Calculate One Rep Max
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>



      </v-card>

    </v-row>




    <Table></Table>

  </v-container>


</template>

<style>
#title {
  /*font-family: "Iowan Old Style";*/
  font-size: 35px;
}

v-text-field{
  width: 20px;
}

</style>

<script>

import Table from './Table';

export default {
  name: 'OneRM',

  components: {
    Table
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
