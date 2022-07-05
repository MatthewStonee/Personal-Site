<template>


  <v-row class="d-flex flex-wrap justify-center mb-7 pt-15">
    <v-card
        class="card"
        :width="width"
        height="575px"
        elevation="10"
    >

      <v-card-title id="title">Repetition Percentages of 1RM</v-card-title>

      <v-data-table
          hide-default-footer
          disable-pagination
          disable-sort
          dense
          header-props.sort-icon="false"
          :headers="headers"
          :items="numbers"
      ></v-data-table>

    </v-card>
  </v-row>



</template>

<style>

</style>

<script>

export default {
  name: 'Table',

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

  data () {
    return {
      items:["lb", "kg"],

      headers: [
        {
          text: 'Repetitions',
          align: 'start',
          value: 'number',
        },
        { text: 'Percentage of 1RM', value: 'percentage', filterable: false, }
      ],
      numbers: [
        {
          number: '1',
          percentage: '100%',
        },
        {
          number: '2',
          percentage: '97%',
        },
        {
          number: '3',
          percentage: '94%',
        },
        {
          number: '4',
          percentage: '92%',
        },
        {
          number: '5',
          percentage: '89%',
        },
        {
          number: '6',
          percentage: '86%',
        },
        {
          number: '7',
          percentage: '83%',
        },
        {
          number: '8',
          percentage: '81%',
        },
        {
          number: '9',
          percentage: '78%',
        },
        {
          number: '10',
          percentage: '75%',
        },
        {
          number: '11',
          percentage: '73%',
        },
        {
          number: '12',
          percentage: '71%',
        },
        {
          number: '12',
          percentage: '70%',
        },
        {
          number: '14',
          percentage: '68%',
        },
        {
          number: '15',
          percentage: '67%',
        }
      ],

    }

  },
};
</script>