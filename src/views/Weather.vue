<template>
  <div id="focus" :class="{ warm: isWarmWeather }">
    <main>

      <v-alert
          class="alert"
          density="compact"
          v-model="alert"
          type="error"
      >{{ alertMessage }}</v-alert>

      <v-row class="solo">
        <div class="me">
          <v-btn height="50"
                 aria-label="Use my location"
                 :loading="loading"
                 :disabled="loading"
                 @click="defaultWeather"
          >
            <v-icon color="blue">mdi-crosshairs-gps</v-icon>
          </v-btn>
        </div>
        <v-text-field
            label="Search a City"
            placeholder="Orlando"
            v-model="query"
            @keydown.enter="fetchWeather"
            @focus="$event.target.select()"
            height="50"
            variant="solo"
        ></v-text-field>
      </v-row>

      <v-skeleton-loader
          v-if="fetching && !hasWeather"
          class="weather-skeleton"
          color="transparent"
          type="heading, text, image, heading"
      ></v-skeleton-loader>

      <div class="weather-wrap" v-if="hasWeather">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys?.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temperature">{{ Math.round(weather.main.temp) }}°F</div>
         <div>
           <v-icon size="125" color="white">{{ icon }}</v-icon>
         </div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>

      </div>

    </main>
  </div>

</template>

<script>
import { resetPageChrome, setPageChrome } from '../composables/usePageChrome'

const COOL_WEATHER_APP_BAR_BACKGROUND = 'dodgerblue'
const WARM_WEATHER_APP_BAR_BACKGROUND = 'firebrick'

export default {

  name: 'Weather',

  data: () => {
    return {
      apiKey: import.meta.env.VUE_APP_OPENWEATHER_KEY,
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
      icon: 'mdi-weather-sunny',

      loading: false,
      fetching: false,

      alert: false,
      alertMessage: '',
      currentController: null,
      unmounted: false,
    }
  },

  computed: {
    hasWeather() {
      return typeof this.weather.main !== 'undefined';
    },

    isWarmWeather() {
      return this.hasWeather && this.weather.main.temp > 70;
    },
  },

  created() {
    this.syncAppBarBackground();
    this.doFetch({ q: 'Orlando' });
  },

  beforeUnmount() {
    // A response or location fix that arrives later must not recolor the next page's app bar.
    this.unmounted = true;
    this.currentController?.abort();
    resetPageChrome();
  },

  methods: {
    syncAppBarBackground() {
      setPageChrome({
        appBarBackground: this.isWarmWeather
          ? WARM_WEATHER_APP_BAR_BACKGROUND
          : COOL_WEATHER_APP_BAR_BACKGROUND,
        appBarBorderColor: 'rgba(255, 255, 255, 0.22)',
        appBarForeground: '#ffffff',
        appBarMuted: 'rgba(255, 255, 255, 0.86)',
      });
    },

    showAlert(message) {
      this.alertMessage = message;
      this.alert = true;
    },

    // Resolves to true when new weather was shown.
    async doFetch(params) {
      this.currentController?.abort();
      const controller = new AbortController();
      this.currentController = controller;
      this.fetching = true;
      const search = new URLSearchParams({ ...params, units: 'imperial', APPID: this.apiKey });
      try {
        const res = await fetch(`${this.url_base}weather?${search}`, { signal: controller.signal });
        if (res.status === 404) {
          this.showAlert('Please enter a valid city name. Ex: Atlanta');
          return false;
        }
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (controller.signal.aborted) return false;
        this.setResults(data);
        return true;
      } catch (e) {
        if (e.name !== 'AbortError') this.showAlert('Could not fetch weather data. Please try again.');
        return false;
      } finally {
        // Only the latest request may clear the shared controller and loading state.
        if (this.currentController === controller) {
          this.currentController = null;
          this.fetching = false;
        }
      }
    },

    getCoords() {
      if (!('geolocation' in navigator)) {
        this.showAlert('Geolocation is not available in your browser.');
        return null;
      }
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000, maximumAge: 600000 });
      });
    },

    async defaultWeather() {
      this.loading = true;
      try {
        const position = await this.getCoords();
        if (!position || this.unmounted) return;
        const { latitude: lat, longitude: lon } = position.coords;
        if (await this.doFetch({ lat, lon })) this.query = this.weather.name;
      } catch (e) {
        this.showAlert('Could not get your location. Please allow location access.');
      } finally {
        this.loading = false;
      }
    },

    fetchWeather() {
      const city = this.query.trim();
      if (city) this.doFetch({ q: city });
    },

    setResults(results) {
      this.weather = results;
      this.syncAppBarBackground();
      this.alert = false;

      if (!this.weather.weather || !this.weather.weather[0]) return;

      switch (this.weather.weather[0].main)
      {
        case "Clear":
          this.icon = "mdi-weather-sunny";
          break;
        case "Thunderstorm":
          this.icon = "mdi-weather-lightning";
          break;
        case "Drizzle":
          this.icon = "mdi-weather-rainy";
          break;
        case "Rain":
          this.icon = "mdi-weather-pouring";
          break;
        case "Clouds":
          this.icon = "mdi-weather-cloudy";
          break;
        case "Snow":
          this.icon = "mdi-snowflake";
          break;
        case "Fog":
        case "Mist":
        case "Haze":
          this.icon = "mdi-weather-fog";
          break;
        default:
          this.icon = "mdi-weather-cloudy";
      }
    },

    dateBuilder() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${month} ${date}, ${year}`;
    }
  },


}

</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#focus {
  background-image: linear-gradient(dodgerblue, lightsteelblue);
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#focus.warm {
  background-image: linear-gradient(firebrick, #f88787);
}

main {
  min-height: 100vh;
  padding: 25px;

}

.solo {
  width: 75%;
  max-width: 700px;
  margin: auto;
  margin-bottom: 5px;
}

.me {
  margin-right: 5px;
}

.weather-skeleton {
  max-width: 500px;
  margin: 30px auto 0;
}

.location-box .location {
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0,0,0,0.25);
}

.location-box .date {
  color: white;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temperature {
  display: inline-block;
  padding: 10px 25px;
  color: white;
  font-size: clamp(48px, 12vw, 102px);
  font-weight: 900;

  text-shadow: 3px 6px rgba(0,0,0,0.25);
  background-color: rgba(255,255,255,0.25);
  border-radius: 16px;
  margin: 30px 0px;

  box-shadow: 3px 6px rgba(0,0,0,0.25);
}

.weather-box .weather {
  color: white;
  font-size: 55px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0,0,0,0.25);
}

.alert {
  width: 75%;
  max-width: 700px;
  margin: auto;
  margin-bottom: 5px;
}


</style>
