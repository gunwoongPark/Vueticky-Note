<template>
  <div>
    <v-btn color="primary" @click="googleLogin">
      <img id="glogo" src="../assets/g2.png" alt="google logo" /><span
        style="color: white"
        >Google 계정으로 로그인하기</span
      >
    </v-btn>
  </div>
</template>

<script>
export default {

  mounted () {
    this.$store.commit("loginCheck");
  },
  methods: {
    googleLogin () {
      this.$store.dispatch("googleLogin");
    },
  },
};
</script>

<style scoped>
#glogo {
  width: 40px;
  height: auto;
}
</style>