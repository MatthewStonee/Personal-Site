<template>
  <div id="focus" :class="typeof weather.main != 'undefined' && weather.main.temp > 70 ? 'warm' : ''">
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
                 :loading="loading"
                 :disabled="loading"
                 @click="loader = 'loading', defaultWeather()"
          >
            <v-icon color="blue">mdi-crosshairs-gps</v-icon>
          </v-btn>
        </div>
        <v-text-field
            label="Search a City"
            placeholder="Orlando"
            v-model="query"
            @keypress="fetchWeather"
            @focus="$event.target.select()"
            height="50"
            variant="solo"
        ></v-text-field>
      </v-row>


      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
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
      default: 'Orlando',
      query: '',
      weather: {},
      icon: 'mdi-weather-sunny',
      code: '',

      loader: null,
      loading: false,

      alert: false,
      alertMessage: '',
      currentController: null,
    }
  },

  created() {
    this.syncAppBarBackground();
    this.doFetch(`${this.url_base}weather?q=orlando&units=imperial&APPID=${this.apiKey}`);
  },

  beforeUnmount() {
    resetPageChrome();
  },

  methods: {
    syncAppBarBackground() {
      setPageChrome({
        appBarBackground: this.isWarmWeather()
          ? WARM_WEATHER_APP_BAR_BACKGROUND
          : COOL_WEATHER_APP_BAR_BACKGROUND,
        appBarBorderColor: 'rgba(255, 255, 255, 0.22)',
        appBarForeground: '#ffffff',
        appBarMuted: 'rgba(255, 255, 255, 0.86)',
      });
    },

    isWarmWeather() {
      return typeof this.weather.main !== 'undefined' && this.weather.main.temp > 70;
    },

    async doFetch(url) {
      this.currentController?.abort();
      this.currentController = new AbortController();
      try {
        const res = await fetch(url, { signal: this.currentController.signal });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        this.setResults(data);
      } catch (e) {
        if (e.name === 'AbortError') return;
        this.alertMessage = 'Could not fetch weather data. Please try again.';
        this.alert = true;
      } finally {
        this.currentController = null;
      }
    },

    getCoords() {
      if (!('geolocation' in navigator)) {
        this.alertMessage = 'Geolocation is not available in your browser.';
        this.alert = true;
        return null;
      }
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },

    async defaultWeather() {
      const l = this.loader;
      this[l] = !this[l];
      try {
        const position = await this.getCoords();
        if (!position) return;
        const { latitude: lat, longitude: lon } = position.coords;
        await this.doFetch(`${this.url_base}weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${this.apiKey}`);
        this.query = 'My Location';
      } catch (e) {
        this.alertMessage = 'Could not get your location. Please allow location access.';
        this.alert = true;
      } finally {
        this[l] = false;
        this.loader = null;
      }
    },

    fetchWeather(e) {
      if (e.key === 'Enter') {
        this.doFetch(`${this.url_base}weather?q=${this.query}&units=imperial&APPID=${this.apiKey}`);
      }
    },

    setResults(results) {
      this.weather = results;
      this.syncAppBarBackground();

      if (this.weather.name == undefined) {
        this.alertMessage = 'Please enter a valid city name. Ex: Atlanta';
        this.alert = true;
        return;
      }

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

body {
  font-family: "Prompt";
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

.search-box {
  width: 65%;
  max-width: 700px;
  margin: auto;
  margin-bottom: 30px;
  color: #070707;

}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #070707;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0,0,0,0.25);
  background-color: rgba(255,255,255,0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;

}

.search-box .search-bar:focus {
  color: #070707;
  box-shadow: 0px 0px 16px rgba(0,0,0,0.25);
  background-color: rgba(255,255,255,0.75);
  border-radius: 16px 0px 16px 0px;
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

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}


</style>
