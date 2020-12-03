<template>
  <v-btn @click="googleLogout"><v-icon>mdi-logout</v-icon></v-btn>
</template>

<script>
export default {
  methods: {
    googleLogout() {
      this.$store.dispatch("googleLogout");
    },
  },
};
</script>

<style scoped>
</style>