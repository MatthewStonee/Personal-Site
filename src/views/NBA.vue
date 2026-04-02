<template>
    <div class="display">
      <v-card
          elevation="15"
      >
        <div class="header">
          Pick a date to see the NBA games played and their final score!
        </div>
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
            <div v-if="loading" class="text-center py-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <div v-else>
              <div
                v-for="item in games" :key="item.teams.home.code"
                class="score-row"
              >
                <v-img :src="require(`../assets/Teams/${item.teams.home.code}.png`)" max-height="60" max-width="60" class="team-logo"></v-img>
                <span class="team-code">{{ item.teams.home.code }}</span>
                <span class="score score-home">{{ item.scores.home.points }}</span>
                <span class="dash">-</span>
                <span class="score score-away">{{ item.scores.visitors.points }}</span>
                <span class="team-code">{{ item.teams.visitors.code }}</span>
                <v-img :src="require(`../assets/Teams/${item.teams.visitors.code}.png`)" max-height="60" max-width="60" class="team-logo"></v-img>
              </div>
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
      url_base: 'https://api-nba-v1.p.rapidapi.com/games?date=',
      games: {},
      date: moment(new Date()).format('YYYY-MM-DD'),
      menu2: false,
      loading: false,
    }
  },

  created() {
    document.title = "NBA";
    this.fetchGames();
  },

  methods: {

    fetchGames() {
      this.loading = true;

      const apiDate = moment(this.date).add(1, 'days').format('YYYY-MM-DD');

      fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${apiDate}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.VUE_APP_RAPIDAPI_KEY
        }})
          .then(res => res.json())
          .then(this.setResults)
          .catch(error => console.log('error', error))
          .finally(() => { this.loading = false; });
    },
    setResults(results) {
      this.games = results.response;
    },

  }

}


</script>

<style scoped>

.display {
  margin: auto;
  max-width: 650px;
  padding: 20px;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.header {
  padding-top: 10px;
  padding-bottom: 10px;
}

.calendar {
  margin: 0 auto;
}

.score-row {
  display: grid;
  grid-template-columns: 60px 50px 60px 30px 60px 50px 60px;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  width: fit-content;
}

.team-logo {
  justify-self: center;
}

.team-code {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.score {
  font-size: 24px;
  font-weight: 700;
}

.score-home {
  text-align: right;
}

.score-away {
  text-align: left;
}

.dash {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}



</style>

