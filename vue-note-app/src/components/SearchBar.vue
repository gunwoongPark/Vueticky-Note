<template>
  <div>
    <v-text-field
      color="rgb(158,215,147)"
      class="searchBar"
      outlined
      label="Type your note..."
      append-icon="mdi-magnify"
      v-model="text"
      hide-details
      type="text"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },

  methods: {
    submitText() {
      this.$emit("submitText", this.text);
    },
  },
};
</script>

<style scoped>
.searchBar {
  margin-right: 15px;
}
</style>
