<template>
  <div>
    <!-- PC뷰 -->
    <v-btn
      class="topBtn mx-2 hidden-sm-and-down"
      color="teal darken-4"
      @click="goTop"
      fab
      dark
    >
      <v-icon>mdi-arrow-up-thick</v-icon>
    </v-btn>

    <!-- 모바일 뷰 -->
    <v-btn
      class="topBtn mx-2 hidden-md-and-up"
      color="teal darken-4"
      @click="goTop"
      fab
      dark
      small
    >
      <v-icon>mdi-arrow-up-thick</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    // 최상단으로 이동하는 간단한 버튼
    goTop() {
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
  right: 2%;
  position: fixed;
  bottom: 4%;
  z-index: 10;
}
</style>
