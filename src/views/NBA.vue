<template>
    <div class="display">
      <v-card
          elevation="15"
      >
        <v-row>

          <v-col
              cols="20"
              sm="6"
              md="4"
              class="calendar mb-n10"
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
        </v-row>


        <v-row>
          <v-col
              cols="20"
              md="55"
              class="calendar"
          >
          <v-card-text
          >
            <div>
            <v-list class="scoreText">
              <v-list-item
                  v-for="item in games" :key="item.teams.home.code"
              >
                  <v-img
                      :src="require(`../assets/Teams/${item.teams.home.code}.png`)"
                      max-height="40"
                      max-width="40"></v-img>
                  <h3 class="left">
                    &nbsp; {{ item.teams.home.code }} &nbsp;
                  </h3>
                  <h2 class="left">
                    &nbsp; {{ item.scores.home.points }} &nbsp;
                  </h2>
                  <h2>-</h2>
                  <h2 class="right">
                    &nbsp; {{ item.scores.visitors.points }} &nbsp;
                  </h2>
                  <h3 class="right">
                    &nbsp; {{ item.teams.visitors.code }} &nbsp;
                  </h3>
                  <v-img
                    :src="require(`../assets/Teams/${item.teams.visitors.code}.png`)"
                    max-height="60"
                    max-width="60"></v-img>

              </v-list-item>
            </v-list>
            </div>
          </v-card-text>
          </v-col>
        </v-row>
      </v-card>

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

.display {
  margin-top: 25px;
  padding: 20px;
}

.scoreText {
  text-align: center;
}
.calendar {
  margin: 0 auto;
}

.left {
  text-align: left;

}

.right {
  text-align: right;

}



</style>

