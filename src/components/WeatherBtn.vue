<template>
  <div>
    <!-- PC 뷰 -->
    <div class="hidden-sm-and-down">
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <img id="weatherBtn" :src="icon" v-bind="attrs" v-on="on" />
        </template>
        <div id="tooltipContainer">
          <h2 style="display: flex; justify-content: center">{{ name }}</h2>
          <p style="display: flex; justify-content: center">
            {{ description }}
          </p>
          <p style="display: flex; justify-content: center">{{ temp }}ºC</p>
        </div>
      </v-tooltip>
    </div>

    <!-- 모바일 뷰 -->
    <div class="hidden-md-and-up">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab small v-bind="attrs" v-on="on"
            ><v-icon>mdi-weather-partly-snowy-rainy</v-icon></v-btn
          >
        </template>
        <div id="tooltipContainer">
          <h2 style="display: flex; justify-content: center">{{ name }}</h2>
          <p style="display: flex; justify-content: center">
            {{ description }}
          </p>
          <p style="display: flex; justify-content: center">{{ temp }}ºC</p>
        </div>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
const apiURL = "https://api.openweathermap.org/data/2.5/weather";
const appid = "7ae860771f4eef0020863071b271395c";

import axios from "axios";
export default {
  data() {
    return {
      position: {},
      name: "",
      temp: "",
      icon: "",
      description: "",
    };
  },
  // 현 위도 경도를 받아오는 자바스크립트 내장 기능을 비동기로 처리해야함
   mounted() {
    // 위도와 경도를 받아서
    this.position =  this.getLocation();
    // 현 위치의 날씨 정보를 얻어온다
    this.getWeather();
  },

  methods: {
    // 현위치 반환
    getLocation() {
      return new Promise(function (resolve) {
        let tempObj = {};
        window.navigator.geolocation.getCurrentPosition((position) => {
          tempObj.lat = String(position.coords.latitude);
          tempObj.lon = String(position.coords.longitude);
          resolve(tempObj);
        });
      });
    },

    // api 요청 함수
    getWeather() {
      axios
        .get(
          `${apiURL}?lat=${this.position.lat}&lon=${this.position.lon}&units=metric&appid=${appid}`
        )
        .then((res) => {
          this.name = res.data.name;
          this.temp = res.data.main.temp;
          this.icon = require(`../assets/${res.data.weather[0].icon}.png`);
          this.description = res.data.weather[0].description;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
</style>