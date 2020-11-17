<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn id="weatherBtn" v-bind="attrs" v-on="on"> Wea2her </v-btn>
      </template>
      <div id="tooltipContainer">
        <h2>{{ weather.name }}</h2>
        <p>{{ weather.temp }}º</p>
        <p>{{ weather.des }}</p>
      </div>
    </v-tooltip>
  </div>
</template>

<script>
import axios from "axios";

const lat = "36.13";
const lon = "128.39";

const apiURL = "http://api.openweathermap.org/data/2.5/weather";
const appid = "7ae860771f4eef0020863071b271395c";

export default {
  data() {
    return { weather: {} };
  },

  async mounted() {
    this.weather = await this.getWeather();
    console.log(this.weather);
  },

  methods: {
    getWeather() {
      return new Promise(function (resolve) {
        let tempObj = {};
        axios
          .get(`${apiURL}?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`)
          .then((res) => {
            tempObj.name = res.data.name;
            tempObj.temperature = res.data.main.temp;
            tempObj.skycode = res.data.weather[0].id;
            tempObj.icon = res.data.weather[0].icon;
            tempObj.description = res.data.weather[0].description;
          })
          .catch((err) => {
            console.log(err);
          });
        resolve(tempObj);
      });
    },
  },
};
</script>

<style scoped>
#weatherBtn {
  left: 2%;
  position: fixed;
  bottom: 12%;
  z-index: 10;
}
</style>