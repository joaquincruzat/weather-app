<template>
  <div>
    <div
      class="weather-component__bg"
      :class="
        typeof weather.main != 'undefined' && weather.main.temp > 23
          ? 'hot'
          : '' || (typeof weather.main != 'undefined' && weather.main.temp > 13)
          ? 'warm'
          : ''
      "
    >
      <div class="weather-component__content">
        <v-toolbar
          dense
          floating
          class="weather-component__search-bar rounded-pill grey lighten-4"
          @keypress="getWeather"
        >
          <v-text-field
            hide-details
            prepend-icon="mdi-magnify"
            single-line
            placeholder="Buscar..."
            v-model="query"
          ></v-text-field>
        </v-toolbar>
        <div
          class="weather-component__info-container"
          v-if="typeof weather.main != 'undefined'"
        >
          <div class="weather-component__location-container">
            <div class="weather-component__location">
              {{ weather.name }}, {{ weather.sys.country }}
            </div>
            <div class="weather-component__date">{{ setDate() }}</div>
          </div>
          <div class="weather-component__weather-container">
            <div class="weather-component__temperature">
              {{ Math.round(weather.main.temp) }}°C
            </div>
            <div class="weather-component__weather-status">
              {{ weather.weather[0].main }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherComponent",
  data() {
    return {
      apiKey: "baf48ede5f61b170ec8628ba06ff02bd",
      urlBase: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },
  methods: {
    getWeather(e) {
      if (e.key === "Enter") {
        fetch(
          `${this.urlBase}weather?q=${this.query}&lang=es&units=metric&APPID=${this.apiKey}`
        )
          .then((res) => res.json())
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    setDate() {
      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let currentDay = currentDate.getDate();
      let currentMonth = currentDate.getMonth() + 1;
      return `${currentDay} / ${currentMonth} / ${currentYear}`;
    },
  },
};
</script>

<style>
.weather-component__bg {
  background-image: url("../assets/cold-bg.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}
.weather-component__bg.hot {
  background-image: url("../assets/hot-bg.jpg");
}
.weather-component__bg.warm {
  background-image: url("../assets/warm-bg.jpg");
}
.weather-component__content {
  min-height: 100vh;
  padding: 25px;
  justify-content: center;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
.weather-component__search-bar {
  display: block;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 35px;
}
.weather-component__location-container .weather-component__location {
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.weather-component__location-container .weather-component__date {
  color: white;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-component__weather-container {
  text-align: center;
}

.weather-component__weather-container .weather-component__temperature {
  display: inline-block;
  padding: 10px 25px;
  color: white;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-component__weather-container .weather-component__weather-status {
  color: white;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
