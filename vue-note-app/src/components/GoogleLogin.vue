<template>
  <div>
    <v-btn @click="googleLogin"><v-icon>mdi-google-plus</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("loginCheck");
  },
  methods: {
    googleLogin() {
      this.$store.dispatch("googleLogin");
    },
  },
};
</script>

<style scoped>
</style>