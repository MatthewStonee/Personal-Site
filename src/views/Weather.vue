<template>
  <div id="focus" :class="typeof weather.main != 'undefined' && weather.main.temp > 70 ? 'warm' : ''">
    <main>

      <v-row class="solo">
        <div class="me">
          <v-btn height="50" @click="defaultWeather"><v-icon>mdi-crosshairs-gps</v-icon></v-btn>
        </div>
        <v-text-field
            label="Search a City"
            placeholder="Orlando"
            v-model="query"
            @keypress="fetchWeather"
            height="50"
            solo
        ></v-text-field>
      </v-row>

      <div class="weather-wrap" v-if="typeof  weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name}}, {{ weather.sys.country}}</div>
          <div class="date">{{  dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temperature">{{ Math.round(weather.main.temp) }}°F</div>
         <div>
           <v-icon size="125" color="white">{{ icon }}</v-icon>
         </div>
          <div class="weather">{{ weather.weather[0].main}}</div>
        </div>

      </div>
    </main>
  </div>

</template>

<script>
export default {

  name: 'Weather',

  data: () => {
    return {
      api_key: '2b45cad984142d1d3b9d6583e5bf55bd',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      default: 'Orlando',
      query: '',
      weather: {},
      icon: 'mdi-weather-sunny',
      code: '',

    }
  },

  created() {
    document.title = "Weather";

    fetch(`${this.url_base}weather?q=orlando&units=imperial&APPID=${this.api_key}`)
        .then(res => {
          return res.json();
        }).then(this.setResults);

  },

  methods: {

    getCoords () {

      //do we support geolocation
      if(!("geolocation" in navigator)) {
        console.log('Geolocation is not available.');
        return;
      }

      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

    },

    async defaultWeather () {

      let pos = {};
      let position = await this.getCoords();
      pos.lat = position.coords.latitude;
      pos.lon = position.coords.longitude;

      fetch(`${this.url_base}weather?lat=${pos.lat}&lon=${pos.lon}&units=imperial&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);

    },

    fetchWeather (e) {
      if (e.key === "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=imperial&APPID=${this.api_key}`)
            .then(res => {
              return res.json();
            }).then(this.setResults);
      }
    },
    setResults (results) {
      this.weather = results;

      console.log("YES");

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
          this.icon = "mdi- weather-fog";
      }


    },
    dateBuilder () {
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

<style>

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

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0,0,0, 0.75));
}

.solo {
  width: 65%;
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
  font-size: 102px;
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


</style>


