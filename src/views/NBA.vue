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
              cols="12"
              sm="6"
              md="4"
              class="calendar mb-n10"
          >
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
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
              cols="12"
              class="calendar"
          >
          <v-card-text
          >
            <div v-if="loading" class="games-skeleton">
              <div
                v-for="index in 4"
                :key="index"
                class="score-row skeleton-row"
              >
                <v-skeleton-loader class="logo-skeleton" type="avatar"></v-skeleton-loader>
                <v-skeleton-loader type="text"></v-skeleton-loader>
                <v-skeleton-loader type="text"></v-skeleton-loader>
                <v-skeleton-loader type="text"></v-skeleton-loader>
                <v-skeleton-loader type="text"></v-skeleton-loader>
                <v-skeleton-loader type="text"></v-skeleton-loader>
                <v-skeleton-loader class="logo-skeleton" type="avatar"></v-skeleton-loader>
              </div>
            </div>
            <div v-else-if="error" class="no-games error-msg">
              {{ error }}
            </div>
            <div v-else>
              <div v-if="games && games.length > 0">
                <div
                  v-for="item in games" :key="item.id"
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
import { gamesOnEasternDate, isSettledUtcDate, toDateString, utcDatesFor } from '../utils/nbaDates.js'

const teamLogos = import.meta.glob('../assets/Teams/*.png', { eager: true, query: '?url', import: 'default' })

// Finished days never change, so they're kept for the session to spare the API quota.
const settledDays = new Map()

export default {

  name: "NBA",

  data: () => {
    return {
      games: [],
      pickerDate: new Date(),
      menu2: false,
      loading: false,
      error: null,
      controller: null,
    }
  },

  computed: {
    date() {
      return toDateString(this.pickerDate)
    },
  },

  created() {
    this.fetchGames();
  },

  beforeUnmount() {
    this.controller?.abort();
  },

  methods: {

    teamLogo(code) {
      return teamLogos[`../assets/Teams/${code}.png`] || ''
    },

    onDateSelected() {
      this.menu2 = false;
      this.fetchGames();
    },

    async fetchGames() {
      this.controller?.abort();
      const controller = new AbortController();
      this.controller = controller;
      this.loading = true;
      this.error = null;

      const easternDate = this.date;

      try {
        const days = await Promise.all(
          utcDatesFor(easternDate).map((utcDate) => this.fetchUtcDay(utcDate, controller.signal))
        );
        this.games = gamesOnEasternDate(days.flat(), easternDate);
      } catch (e) {
        if (e.name === 'AbortError') return;
        this.games = [];
        this.error = e.status === 429
          ? 'The daily limit for NBA scores has been reached. Please try again tomorrow.'
          : 'Failed to load games. Please try again.';
      } finally {
        // A newer request owns the loading state once it has replaced this one.
        if (this.controller === controller) {
          this.controller = null;
          this.loading = false;
        }
      }
    },

    async fetchUtcDay(utcDate, signal) {
      if (settledDays.has(utcDate)) return settledDays.get(utcDate);

      const res = await fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${utcDate}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VUE_APP_RAPIDAPI_KEY
        },
        signal,
      });
      if (!res.ok) throw Object.assign(new Error(`NBA API error: ${res.status}`), { status: res.status });

      const results = await res.json();
      if (results.errors && Object.keys(results.errors).length > 0) {
        throw new Error('NBA API rejected the request');
      }

      const games = results.response || [];
      if (isSettledUtcDate(utcDate)) settledDays.set(utcDate, games);
      return games;
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
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.error-msg {
  color: rgb(var(--v-theme-error));
}

.games-skeleton {
  display: grid;
  gap: 12px;
}

.skeleton-row {
  padding: 6px 0;
}

.logo-skeleton {
  max-width: 60px;
}



</style>
