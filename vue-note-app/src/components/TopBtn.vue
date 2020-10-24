<template>
  <div>
    <v-btn class="topBtn mx-2" @click="goTop" fab dark color="#00897B">
      <v-icon>mdi-arrow-up-thick</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    goTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }
}
</script>

<style scoped>
.topBtn {
  right: 5%;
  position: fixed;
  bottom: 5%;
  z-index: 10;
}
</style>
