<template>
  <v-btn style="color: white" color="teal" @click="googleLogout">Logout</v-btn>
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