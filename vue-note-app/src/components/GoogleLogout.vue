<template>
  <v-btn @click="googleLogout"><v-icon>mdi-logout</v-icon></v-btn>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
  },
  methods: {
    googleLogout() {
      if (this.isLogin) this.$store.dispatch("googleLogout");
      else alert("로그인 상태가 아닙니다.");
    },
  },
};
</script>

<style scoped>
</style>