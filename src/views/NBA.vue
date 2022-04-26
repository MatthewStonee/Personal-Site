<template>
  <div>
    <div class="display">
      <v-card
          class="card mt-10"
      >
        <v-row>

          <v-col
              cols="20"
              sm="6"
              md="4"
          >
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Pick a Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="date"
                  @input="menu2 = false, fetchGames()"
              ></v-date-picker>
            </v-menu>
          </v-col>



          <v-card-text>
            <div class="scoreText">
            <v-list>
              <v-list-item
                  v-for="item in games" :key="item.teams.home.code"
              >
                  <h2>
                    {{ item.teams.home.code }}:
                  </h2>
                  <h3>
                    &nbsp; {{ item.scores.home.points }}
                  </h3>
                  <h2>
                    &nbsp; {{ item.teams.visitors.code }}:
                  </h2>
                  <h3>
                    &nbsp; {{ item.scores.visitors.points }}
                  </h3>

              </v-list-item>
            </v-list>
            </div>
          </v-card-text>
        </v-row>
      </v-card>

    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {

  name: "NBA",

  data: () => {
    return {
      api_key: 'ed88420268msh8ad778ec7682163p11d092jsn1ca842f5f5cb',
      url_base: 'https://api-nba-v1.p.rapidapi.com/games?date=',
      games: {},
      home: [],
      visitors: [],
      numofResults: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,



    }
  },

  created() {

    document.title = "NBA";

    this.date = moment(new Date()).format('YYYY-MM-DD');

    console.log("TODAY'S DATE IS " + this.date);

    fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${this.date}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
        "x-rapidapi-key": "ed88420268msh8ad778ec7682163p11d092jsn1ca842f5f5cb"
      }})
        .then(res => {
          return res.json();
        })
        .then(this.setResults)
        .catch(error => console.log('error', error));



  },

  methods: {

    fetchGames() {

      fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${this.date}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key": "ed88420268msh8ad778ec7682163p11d092jsn1ca842f5f5cb"
        }})
          .then(res => {
            return res.json();
          })
          .then(this.setResults)
          .catch(error => console.log('error', error));


    },
    setResults(results) {
      const obj = results;
      this.numofResults = obj.results;

      //console.log("DATE: " + obj.parameters.date);
      //console.log("Number of results = " + obj.results);

      this.games = {};

      for(let i = 0; i < this.numofResults; i++)
      {
        this.games[i] = obj.response[i];

      }


    },


  }


}


</script>

<style>
.card {
  margin: 0 auto;
  width: 500px;
}

.display {
  padding-top: 10px;
}

.scoreText {
  text-align: center;
}



</style>

