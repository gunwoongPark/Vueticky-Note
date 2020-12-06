<template>
  <v-btn style="color: teal" color="white" fab small @click="googleLogout"
    ><v-icon>mdi-logout</v-icon></v-btn
  >
</template>

<script>
export default {
  methods: {
    googleLogout () {
      this.$store.dispatch("googleLogout");
    },
  },
};
</script>

<style scoped>
</style>