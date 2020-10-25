<template>
  <div>
    <v-text-field
      color="teal"
      class="searchBar"
      outlined
      label="Type a note to find..."
      append-icon="mdi-magnify"
      v-model="text"
      hide-details
      type="text"
      @input="submitText"
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
