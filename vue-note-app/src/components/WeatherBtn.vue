<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="testBtn" color="teal" dark v-bind="attrs" v-on="on" small>
          weather
        </v-btn>
      </template>
      <v-card><h1>hello!</h1></v-card>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  computed: {
    weather() {
      return this.$store.getters.getWeather;
    },
  },
};
</script>

<style scoped>
.testBtn {
  right: 5%;
  position: fixed;
  top: 5%;
  z-index: 10;
}
</style>