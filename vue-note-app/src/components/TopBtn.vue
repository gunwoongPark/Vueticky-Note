<template>
  <div>
    <v-btn class="topBtn mx-2" color="teal darken-4" @click="goTop" fab dark>
      <v-icon>mdi-arrow-up-thick</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    // 최상단으로 이동하는 간단한 버튼
    goTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.topBtn {
  right: 5%;
  position: fixed;
  bottom: 5%;
  z-index: 10;
}
</style>
