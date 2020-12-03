<template>
  <div>
    <v-btn @click="googleLogin"><v-icon>mdi-google-plus</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
  },
  mounted() {
    this.$store.commit("loginCheck");
  },

  methods: {
    googleLogin() {
      if (!this.isLogin) this.$store.dispatch("googleLogin");
      else alert("이미 로그인되어 있습니다.");
    },
  },
};
</script>

<style scoped>
</style>