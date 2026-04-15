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
              <template v-slot:activator="{ props }">
                <v-text-field
                    :model-value="date"
                    label="Pick a Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="pickerDate"
                  @update:model-value="onDateSelected"
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
            <div v-else-if="error" class="no-games error-msg">
              {{ error }}
            </div>
            <div v-else>
              <div v-if="games && games.length > 0">
                <div
                  v-for="item in games" :key="item.teams.home.code"
                  class="score-row"
                >
                  <v-img :src="teamLogo(item.teams.home.code)" width="60" aspect-ratio="1" class="team-logo"></v-img>
                  <span class="team-code">{{ item.teams.home.code }}</span>
                  <span class="score score-home">{{ item.scores.home.points }}</span>
                  <span class="dash">-</span>
                  <span class="score score-away">{{ item.scores.visitors.points }}</span>
                  <span class="team-code">{{ item.teams.visitors.code }}</span>
                  <v-img :src="teamLogo(item.teams.visitors.code)" width="60" aspect-ratio="1" class="team-logo"></v-img>
                </div>
              </div>
              <div v-else class="no-games">
                No games played on this date.
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

const teamLogos = import.meta.glob('../assets/Teams/*.png', { eager: true, import: 'default' })

export default {

  name: "NBA",

  data: () => {
    return {
      games: [],
      pickerDate: new Date(),
      menu2: false,
      loading: false,
      error: null,
    }
  },

  computed: {
    date() {
      return moment(this.pickerDate).format('YYYY-MM-DD')
    },
  },

  created() {
    document.title = "NBA";
    this.fetchGames();
  },

  methods: {

    teamLogo(code) {
      return teamLogos[`../assets/Teams/${code}.png`]
    },

    onDateSelected() {
      this.menu2 = false;
      this.fetchGames();
    },

    fetchGames() {
      this.loading = true;
      this.error = null;

      const apiDate = moment(this.pickerDate).add(1, 'days').format('YYYY-MM-DD');

      fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${apiDate}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VUE_APP_RAPIDAPI_KEY
        }})
          .then(res => res.json())
          .then(this.setResults)
          .catch(() => { this.error = 'Failed to load games. Please try again.'; })
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
  grid-template-columns: 60px 1fr 1fr 20px 1fr 1fr 60px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 10px auto;
  max-width: 100%;
  overflow-x: hidden;
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

.no-games {
  text-align: center;
  padding: 24px 0;
  color: rgba(255, 255, 255, 0.6);
}

.error-msg {
  color: #ef5350;
}



</style>

