<template>
  <div>
    <!-- PC 뷰 -->
    <div class="hidden-sm-and-down">
      <v-btn v-if="isDark" rounded class="changeBtn" @click="changeMode"
        >라이트 모드로 보기<v-icon right>mdi-weather-sunny</v-icon></v-btn
      >

      <v-btn v-else rounded class="changeBtn" @click="changeMode">
        다크 모드로 보기<v-icon right>mdi-weather-night</v-icon>
      </v-btn>
    </div>

    <!-- 모바일 뷰 -->
    <div class="hidden-md-and-up">
      <v-btn small v-if="isDark" fab class="changeBtn" @click="changeMode"
        ><v-icon>mdi-weather-sunny</v-icon></v-btn
      >

      <v-btn small v-else fab class="changeBtn" @click="changeMode">
        <v-icon>mdi-weather-night</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isDark: {
      required: true,
    },
  },
  methods: {
    changeMode() {
      this.$emit("changeMode", !this.isDark);
    },
  },
};
</script>

<style scoped>
.changeBtn {
  left: 2%;
  position: fixed;
  bottom: 4%;
  z-index: 10;
}
</style>
