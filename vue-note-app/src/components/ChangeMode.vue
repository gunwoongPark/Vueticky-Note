<template>
  <div>
    <v-btn v-if="isDark" rounded class="changeBtn" @click="changeMode"
      >라이트 모드로 보기<v-icon right>mdi-white-balance-sunny</v-icon></v-btn
    >

    <v-btn v-else rounded class="changeBtn" @click="changeMode">
      다크 모드로 보기<v-icon dark right>mdi-weather-night</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    isDark: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    changeMode() {
      this.$emit("changeMode");
    },
  },
};
</script>

<style scoped>
.changeBtn {
  left: 5%;
  position: fixed;
  bottom: 5%;
  z-index: 10;
}
</style>
